import asyncHandler from "../middleware/asyncHandler";
import Property from "../models/propertyModel";
import User from "../models/userModel";
import type { Request, Response } from "express";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { profile_name, user_id, user_name } = req.body;

  if (!profile_name || !user_id || !user_name) {
    return res.status(400).json({
      success: false,
      message: "All fields are required profile_name, user_id, user_name",
    });
  }

  const existingUser = await User.findOne({ user_id });
  if (existingUser) {
    return res.status(201).json({
      success: true,
      data: { text: "Welcome back", user: existingUser },
    });
  }

  const user = await User.create({
    profile_name,
    user_id,
    user_name,
    favorites: [],
    createdAt: new Date(),
  });

  return res.status(201).json({
    success: true,
    data: { text: "Welcome", user },
  });
});

export const addFavorite = asyncHandler(async (req: Request, res: Response) => {
  const { user_id, propertyId } = req.body;

  const user = await User.findById(user_id);
  const propertyExists = await Property.findById(propertyId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (!propertyExists) {
    return res.status(404).json({
      success: false,
      message: "Property not found",
    });
  }

  if (!propertyId) {
    return res.status(400).json({
      success: false,
      message: "Property ID is required",
    });
  }

  user.favorites.push(propertyId);
  await user.save();

  return res.status(200).json({
    success: true,
    user,
  });
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

export const getUsers = asyncHandler(async (_: Request, res: Response) => {
  const users = await User.find();

  return res.status(200).json({
    success: true,
    users,
  });
});
