import Property from "../models/propertyModel";
import asyncHandler from "../middleware/asyncHandler";
import type { Request, Response } from "express";
import User from "../models/userModel";
import fs from "fs";
import path from "path";

export const getProperties = asyncHandler(
  async (req: Request, res: Response) => {
    // Pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: Record<string, any> = {};

    // Filter by category if category ID is provided
    if (req.query.category) {
      filter["details.type"] = req.query.category;
    }

    // Price range filtering
    if (req.query.minPrice || req.query.maxPrice) {
      filter["details.price"] = {};
      if (req.query.minPrice) {
        filter["details.price"]["$gte"] = parseInt(
          req.query.minPrice as string
        );
      }
      if (req.query.maxPrice) {
        filter["details.price"]["$lte"] = parseInt(
          req.query.maxPrice as string
        );
      }
    }


    if(req.query.user_id){
      filter["contact"] = req.query.user_id;
    }
    // Rooms filtering
    if (req.query.rooms) {
      filter["details.rooms"] = parseInt(req.query.rooms as string);
    }

    // Material filtering
    if (req.query.material) {
      filter["details.material"] = req.query.material;
    }

    // Year built range
    if (req.query.minYear || req.query.maxYear) {
      filter["details.year_built"] = {};
      if (req.query.minYear) {
        filter["details.year_built"]["$gte"] = parseInt(
          req.query.minYear as string
        );
      }
      if (req.query.maxYear) {
        filter["details.year_built"]["$lte"] = parseInt(
          req.query.maxYear as string
        );
      }
    }

    // Mortgage option
    if (req.query.mortgage !== undefined) {
      filter["details.mortgage"] = req.query.mortgage === "true";
    }

    // Urgent sale
    if (req.query.isUrgent !== undefined) {
      filter["details.is_urgent"] = req.query.isUrgent === "true";
    }

    // Count total documents for pagination info based on filters
    const total = await Property.countDocuments(filter);

    // Get paginated properties with filters
    const properties = await Property.find(filter)
      .populate("contact")
      .populate("details.type")
      .limit(limit)
      .skip(skip);

    if (!properties.length) {
      return res.status(404).json({
        success: false,
        message: "No properties match your criteria",
      });
    }

    return res.status(200).json({
      success: true,
      properties,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  }
);

export const getMyProperties = asyncHandler(
  async (req: Request, res: Response) => {
    const telegramId = req.headers["user-id"] as string;
    const user = await User.findOne({ user_id: telegramId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const properties = await Property.find({ contact: user._id }).populate(
      "details.type"
    );

    return res.status(200).json({
      success: true,
      properties,
    });
  }
);

export const getPropertyById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const property = await Property.findById(id)
      .populate("contact")
      .populate("details.type");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return res.status(200).json({
      success: true,
      property,
    });
  }
);

export const createProperty = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      title,
      text,
      address,
      images,
      property_class,
      details,
      inputNumber,
    } = req.body;

    const telegramId = req.headers["user-id"] as string;
    const user = await User.findOne({ user_id: telegramId });

    // Проверяем, есть ли авторизованный пользователь
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Пользователь не авторизован",
      });
    }

    const property = await Property.create({
      title,
      text,
      address,
      images,
      property_class,
      contact: user._id, // Привязываем к текущему пользователю
      inputNumber,
      details,
    });

    return res.status(201).json({
      success: true,
      property,
    });
  }
);

export const updateProperty = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const telegramId = req.headers["user-id"] as string;
    const user = await User.findOne({ user_id: telegramId });

    // Проверяем существование объекта и права доступа
    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Проверка прав (владелец или админ)
    if (
      existingProperty.contact &&
      existingProperty.contact.toString() !== user?._id.toString() &&
      !req.user?.isAdmin
    ) {
      return res.status(403).json({
        success: false,
        message: "You dont have permission to update this property",
      });
    }

    // Создаем объект для $set с сохранением структуры вложенных объектов
    const updateData: Record<string, any> = {};

    // Special handling for details.type (category) if it exists
    if (req.body.details && req.body.details.type) {
      // If type is sent as a string (just the ID), handle it directly
      if (typeof req.body.details.type === "string") {
        updateData["details.type"] = req.body.details.type;
      }
      // If type is sent as an object with _id, extract the ID
      else if (req.body.details.type && req.body.details.type._id) {
        updateData["details.type"] = req.body.details.type._id;
      }

      // Remove type from details to prevent duplicate processing below
      const detailsCopy = { ...req.body.details };
      delete detailsCopy.type;
      req.body.details = detailsCopy;
    }

    // Обрабатываем каждый ключ из тела запроса
    for (const [key, value] of Object.entries(req.body)) {
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        // Для вложенных объектов обновляем поля по отдельности
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          updateData[`${key}.${nestedKey}`] = nestedValue;
        }
      } else {
        // Простые поля обновляем как есть
        updateData[key] = value;
      }
    }

    // Выполняем обновление
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate("details.type")
      .populate("contact");

    return res.status(200).json({
      success: true,
      property: updatedProperty,
    });
  }
);

export const deleteProperty = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const telegramId = req.headers["user-id"] as string;
    const user = await User.findOne({ user_id: telegramId });
    // Находим существующий объект
    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Проверяем доступ (только владелец или админ могут удалять)
    if (
      user &&
      existingProperty.contact &&
      existingProperty.contact.toString() !== user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({
        success: false,
        message: "You dont have permission to delete this property",
      });
    }

    // Delete property images from uploads folder
    if (existingProperty.images && existingProperty.images.length > 0) {
      const uploadDir = path.resolve("uploads/users");

      // Delete each image
      existingProperty.images.forEach((image) => {
        if (image.path) {
          const imagePath = path.join(uploadDir, path.basename(image.path));
          // Delete the main image
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }

        // Also delete preview if exists
        if (image.preview) {
          const previewPath = path.join(
            uploadDir,
            path.basename(image.preview)
          );
          if (fs.existsSync(previewPath)) {
            fs.unlinkSync(previewPath);
          }
        }
      });
    }

    await Property.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Property deleted",
    });
  }
);
