import express from "express";
import { uploadMiddleware, handleImageUpload, deleteImage, getAllImages } from "../controllers/uploadController";
import path from "path";
import type { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import fs from "fs";

const router = express.Router();

// Получение списка всех изображений
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    getAllImages(req, res);
  })
);

// Универсальный роут для загрузки изображений
router.post(
  "/",
  (req, res, next) => {
    // Проверяем, есть ли параметр multiple в запросе
    const useMultiple = req.query.multiple === "true" || req.body.multiple === true;

    if (useMultiple) {
      uploadMiddleware.multiple(req, res, next);
    } else {
      uploadMiddleware.single(req, res, next);
    }
  },
  asyncHandler(async (req: Request, res: Response) => {
    handleImageUpload(req, res);
  })
);

// Маршрут для доступа к загруженным файлам
router.get(
  "/file/:filename",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const { type } = req.query;
      let subDir = 'users';
      
      // Determine which subdirectory to use
      if (type === 'icons') {
        subDir = 'icons';
      } else if (type === 'companies') {
        subDir = 'companies';
      }
      
      // Абсолютный путь к файлу
      const filePath = path.resolve(process.cwd(), "uploads", subDir, req.params.filename);
      console.log("Запрошенный файл:", filePath);

      // Проверяем существование файла
      if (!fs.existsSync(filePath)) {
        // Try the other directories if file not found
        const otherDirs = ['users', 'icons', 'companies'].filter(dir => dir !== subDir);
        
        for (const dir of otherDirs) {
          const altPath = path.resolve(process.cwd(), "uploads", dir, req.params.filename);
          if (fs.existsSync(altPath)) {
            return res.sendFile(altPath);
          }
        }
        
        // If still not found, check the root uploads directory (for backward compatibility)
        const rootPath = path.resolve(process.cwd(), "uploads", req.params.filename);
        if (fs.existsSync(rootPath)) {
          return res.sendFile(rootPath);
        }
        
        console.log("Файл не найден");
        return res.status(404).send("File not found");
      }

      return res.sendFile(filePath);
    } catch (error) {
      console.error("Ошибка при доступе к файлу:", error);
      return res.status(500).send("Server error");
    }
  })
);

// Маршрут для удаления изображения
router.delete(
  "/file/:filename",
  asyncHandler(async (req: Request, res: Response) => {
    deleteImage(req, res);
  })
);

export default router;
