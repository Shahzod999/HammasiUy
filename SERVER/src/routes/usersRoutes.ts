import express from "express";
import { createUser, addFavorite, getUser, getUsers } from "../controllers/userController";
// import protectedRoutes from "../middleware/protectedRoutes.ts";

const router = express.Router();

router.post("/createUser", createUser);
router.post("/addFavorite", addFavorite);
router.get("/:id", getUser);
router.get("/", getUsers);

export default router;
