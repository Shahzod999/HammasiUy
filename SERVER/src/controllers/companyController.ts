import asyncHandler from "../middleware/asyncHandler";
import Company from "../models/companyModel";
import type { Request, Response } from "express";
import User from "../models/userModel";
import fs from "fs";
import path from "path";

export const createCompany = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, website, email } = req.body;
    console.log("Request boyd", req.body);
    console.log("Request files", req.files);

    const telegramId = req.headers["user-id"] as string;
    const user = await User.findOne({ user_id: telegramId });

    // Проверяем, есть ли авторизованный пользователь
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Пользователь не авторизован",
      });
    }
    if (!name || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Обработка файлов (если они есть)
    let images: { path: string; preview: string }[] = [];

    // Handle existing images from the request
    if (req.body.existingImages) {
      const existingImages = Array.isArray(req.body.existingImages)
        ? req.body.existingImages
        : [req.body.existingImages];

      images = existingImages.map((path: string) => ({
        path,
        preview: path,
      }));
    }

    // Add new uploaded files if any
    if (req.files && Array.isArray(req.files)) {
      const newImages = req.files.map((file) => ({
        path: `/uploads/companies/${file.filename}`,
        preview: `/uploads/companies/${file.filename}`,
      }));
      images = [...images, ...newImages];
    }

    // Проверяем, есть ли у пользователя уже компания
    const existingCompany = await Company.findOne({ user_id: user._id });

    if (existingCompany) {
      // If no new images were provided, keep existing ones
      const finalImages = images.length > 0 ? images : existingCompany.images;

      // Если компания существует, обновляем её
      const updatedCompany = await Company.findByIdAndUpdate(
        existingCompany._id,
        {
          name,
          description,
          website,
          email,
          images: finalImages,
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        company: updatedCompany,
        message: "Company updated successfully",
      });
    }

    // Если компании нет, создаём новую
    const company = await Company.create({
      name,
      description,
      website,
      email,
      user_id: user._id,
      images,
    });

    return res.status(201).json({
      success: true,
      company,
      message: "Company created successfully",
    });
  }
);

export const getCompanies = asyncHandler(
  async (_req: Request, res: Response) => {
    const companies = await Company.find();

    if (!companies) {
      return res.status(404).json({ message: "Companies not found" });
    }
    res.status(200).json({ success: true, companies });
  }
);

export const myCompany = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findOne({
    user_id: req.headers["user-id"] as string,
  });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const company = await Company.findOne({ user_id: user._id });

  res.status(200).json(company);
});

export const getCompanyById = asyncHandler(
  async (req: Request, res: Response) => {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  }
);

export const deleteCompany = asyncHandler(
  async (req: Request, res: Response) => {
    const company = await Company.findById(req.params.id);
    const user = await User.findOne({
      user_id: req.headers["user-id"] as string,
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    if (
      user &&
      company.user_id &&
      company.user_id.toString() !== user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You dont have permission to delete this property",
      });
    }

    // Delete associated images
    if (company.images && company.images.length > 0) {
      company.images.forEach((image) => {
        const imagePath = path.join(process.cwd(), image.path);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    // Delete the company
    await Company.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Company and associated images deleted successfully",
    });
  }
);
