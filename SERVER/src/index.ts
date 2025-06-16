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

botStart();
connectDB();

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const app = express();

const allowedOrigins = ["http://localhost:1995", "https://gxfl20sh-1995.euw.devtunnels.ms", "https://your-frontend-app.vercel.app"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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

// Vercel использует serverless функции, поэтому не используем традиционный метод listen
// но сохраняем его для локальной разработки
app.listen(port, () => console.log(`Server running on port: ${port}`));

app.get("/", (_req, res) => {
  res.json({ message: "nice" });
});

app.use("/api/users", usersRoutes);
app.use("/api/properties", propertiesRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/map", mapRoutes);
app.use("/api/companies", companyRoutes);

// Экспортируем app для Vercel
export default app;
