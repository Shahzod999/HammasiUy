import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import botStart from "./telegram/bot";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import usersRoutes from "./routes/usersRoutes";
import propertiesRoutes from "./routes/propertiesRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";
import companyRoutes from "./routes/companyRoutes";
import path from "path";
import mapRoutes from "./routes/mapRoutes";

dotenv.config();

// Инициализация бота с обработкой ошибок
try {
  botStart();
  console.log("Telegram bot started successfully");
} catch (error) {
  console.error("Failed to start Telegram bot:", error);
}

// Подключение к базе данных
connectDB();

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const app = express();

const allowedOrigins = [
  "http://localhost:1995",
  "https://gxfl20sh-1995.euw.devtunnels.ms",
  "https://your-frontend-app.vercel.app",
  "https://hammasiuy.com",
  "https://www.hammasiuy.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "user-id"],
  })
);

// Middleware для логирования запросов
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Add JSON parsing error handler
app.use(
  express.json({
    verify: (_req: express.Request, res: any, buf, _encoding) => {
      try {
        JSON.parse(buf.toString());
      } catch (e) {
        res.status(400).json({ success: false, message: "Invalid JSON payload" });
        throw new Error("Invalid JSON");
      }
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// статический маршрут для доступа к загруженным файлам
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Тестовый маршрут для проверки работы API
app.get("/", (_req, res) => {
  res.json({ 
    message: "API is working", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Тестовый маршрут для проверки API
app.get("/api", (_req, res) => {
  res.json({ 
    message: "API endpoint is working", 
    timestamp: new Date().toISOString(),
    routes: [
      "/api/users",
      "/api/properties", 
      "/api/uploads",
      "/api/categories",
      "/api/map",
      "/api/companies"
    ]
  });
});

app.use("/api/users", usersRoutes);
app.use("/api/properties", propertiesRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/map", mapRoutes);
app.use("/api/companies", companyRoutes);

// Обработка 404 ошибок
app.use("*", (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.originalUrl} not found` 
  });
});

// Глобальный обработчик ошибок
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Global error handler:", error);
  res.status(500).json({ 
    success: false, 
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.message : undefined
  });
});

// Vercel использует serverless функции, поэтому не используем традиционный метод listen
// но сохраняем его для локальной разработки
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`MongoDB URL: ${process.env.MONGO_URL ? "Configured" : "Not configured"}`);
});

// Экспортируем app для Vercel
export default app;
