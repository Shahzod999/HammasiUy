import asyncHandler from "../middleware/asyncHandler";
import Category from "../models/categoryModels";
import type { Request, Response } from "express";

export const getCategories = asyncHandler(
  async (_req: Request, res: Response) => {
    const categories = await Category.find();
    if (!categories) {
      res.status(404).json({
        success: false,
        message: "Categories not found",
      });
    }
    res.status(200).json({
      success: true,
      data: categories,
    });
  }
);

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description } = req.body;
    let icon = null;
    
    if (req.file) {
      // Save path to icon in icons subfolder
      icon = `/uploads/icons/${req.file.filename}`;
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    await Category.create({ 
      name, 
      description, 
      icon 
    });

    res.status(201).json({
      success: true,
      message: "Category created",
    });
  }
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description } = req.body;
    let updateData: { name: string; description: string; icon?: string } = { name, description };
    
    // If icon is uploaded, add it to update data
    if (req.file) {
      updateData = {
        ...updateData,
        icon: `/uploads/icons/${req.file.filename}`
      };
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    
    res.status(200).json({
      success: true,
      data: category
    });
  }
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({ 
      success: true,
      message: "Category deleted" 
    });
  }
);
