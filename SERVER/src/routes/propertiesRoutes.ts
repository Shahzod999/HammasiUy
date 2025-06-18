import express from "express";
import { getProperties, getPropertyById, createProperty, updateProperty, deleteProperty, getMyProperties } from "../controllers/propertyController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router
  .get("/", getProperties)
  .get("/myProperties", getMyProperties)
  .get("/:id", getPropertyById)
  .post("/", protect, createProperty)
  .put("/:id", protect, updateProperty) //должен быть websocket
  .delete("/:id", protect, deleteProperty);

export default router;
