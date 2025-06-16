import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { uploadMiddleware } from "../controllers/uploadController";
const router = express.Router();

router
  .get("/", getCategories)
  .post("/", uploadMiddleware.single, createCategory)
  .put("/:id", uploadMiddleware.single, updateCategory)
  .delete("/:id", deleteCategory);

export default router;
