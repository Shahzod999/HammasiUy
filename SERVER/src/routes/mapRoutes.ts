import express from "express";
import { mapController } from "../controllers/mapController";


const router = express.Router();

router.get("/", mapController);

export default router;
