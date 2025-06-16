import multer from "multer";
import type { Request, Response } from "express";
import path from "path";
import fs from "fs";

// Add interface declaration for Express Request
declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
      files?:
        | Express.Multer.File[]
        | { [fieldname: string]: Express.Multer.File[] };
    }
  }
}

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads");
const iconsDir = path.join(process.cwd(), "uploads", "icons");
const usersDir = path.join(process.cwd(), "uploads", "users");
const companiesDir = path.join(process.cwd(), "uploads", "companies");

// Create uploads and icons directories if they don't exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

if (!fs.existsSync(usersDir)) {
  fs.mkdirSync(usersDir, { recursive: true });
}

if (!fs.existsSync(companiesDir)) {
  fs.mkdirSync(companiesDir, { recursive: true });
}

// Создаем хранилище для файлов
const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    // Check if this is a category icon upload
    if (req.originalUrl.includes("/categories")) {
      cb(null, "uploads/icons/");
    } else if (req.originalUrl.includes("/companies")) {
      cb(null, "uploads/companies/");
    } else {
      cb(null, "uploads/users/");
    }
  },
  filename: (_req, file, cb) => {
    // Генерируем уникальное имя файла
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (_req: Request, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, GIF and SVG are allowed."));
    }
  },
});

// Создаем middleware для обработки одиночных и множественных файлов
const uploadMiddleware = {
  single: upload.single("image"),
  multiple: upload.array("images", 10),
};

// Функция обработки одного или нескольких изображений
const handleImageUpload = (req: Request, res: Response) => {
  if (
    !req.file &&
    (!req.files || (Array.isArray(req.files) && req.files.length === 0))
  ) {
    res.status(400).json({
      success: false,
      message: "No files uploaded",
    });
    return;
  }

  // Обработка одного файла
  if (req.file) {
    // Возвращаем только относительный путь к файлу
    const filePath = `/uploads/users/${req.file.filename}`;
    return res.json({
      success: true,
      filePath,
    });
  }

  // Обработка нескольких файлов
  let filesArray: Express.Multer.File[] = [];

  if (Array.isArray(req.files)) {
    filesArray = req.files;
  } else if (req.files) {
    // Преобразуем объект массивов в один массив
    Object.keys(req.files).forEach((key) => {
      const fileGroup = (
        req.files as { [fieldname: string]: Express.Multer.File[] }
      )[key];
      filesArray = [...filesArray, ...fileGroup];
    });
  }

  // Если только один файл, возвращаем в том же формате, что и для single
  if (filesArray.length === 1) {
    const filePath = `/uploads/users/${filesArray[0].filename}`;
    return res.json({
      success: true,
      filePath,
    });
  }
  // одна или несколько мы всегда возвращаем filePath
  const filePath = filesArray.map((file) => {
    return `/uploads/users/${file.filename}`;
  });

  return res.json({
    success: true,
    filePath,
  });
};

// Функция для удаления изображения
const deleteImage = (req: Request, res: Response) => {
  const { filename } = req.params;
  const { directory } = req.query;

  if (!filename) {
    return res.status(400).json({
      success: false,
      message: "Filename is required",
    });
  }

  try {
    // Determine the appropriate subdirectory
    let subDir = "users";
    if (directory === "icons") {
      subDir = "icons";
    }

    // Абсолютный путь к файлу
    const filePath = path.resolve(process.cwd(), "uploads", subDir, filename);
    console.log("Удаление файла:", filePath);

    // Проверяем, что путь указывает на файл внутри директории uploads
    const uploadsDir = path.resolve(process.cwd(), "uploads");
    if (!filePath.startsWith(uploadsDir)) {
      console.log("Недопустимый путь:", filePath);
      return res.status(400).json({
        success: false,
        message: "Invalid filename",
      });
    }

    // Проверяем существование файла
    if (!fs.existsSync(filePath)) {
      console.log("Файл не найден:", filePath);
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    // Удаляем файл
    fs.unlinkSync(filePath);
    console.log("Файл успешно удален:", filePath);

    return res.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting file",
    });
  }
};

// Функция для получения списка всех изображений
const getAllImages = (req: Request, res: Response) => {
  const { imageType } = req.query;
  let targetDir = "users";

  if (imageType === "icons") {
    targetDir = "icons";
  }

  const dirPath = path.join(process.cwd(), "uploads", targetDir);

  try {
    // Проверяем существование директории
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      return res.json({
        success: true,
        images: [],
      });
    }

    // Получаем список файлов
    const files = fs.readdirSync(dirPath);

    // Фильтруем только изображения
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".svg"];
    const images = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
      })
      .map((file) => ({
        filename: file,
        path: `/uploads/${targetDir}/${file}`,
        fullPath: path.join(dirPath, file),
        size: fs.statSync(path.join(dirPath, file)).size,
        createdAt: fs.statSync(path.join(dirPath, file)).birthtime,
      }));

    return res.json({
      success: true,
      images,
    });
  } catch (error) {
    console.error("Error getting images:", error);
    return res.status(500).json({
      success: false,
      message: "Error getting images",
    });
  }
};

export {
  upload,
  uploadMiddleware,
  handleImageUpload,
  deleteImage,
  getAllImages,
};
