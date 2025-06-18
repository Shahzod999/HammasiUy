import express from "express";
import { uploadMiddleware } from "../controllers/uploadController";
import {
  createCompany,
  getCompanyById,
  getCompanies,
  deleteCompany,
  myCompany,
} from "../controllers/companyController";

const router = express.Router();

router.post("/", uploadMiddleware.multiple, createCompany);
router.get("/", getCompanies);
router.get("/my", myCompany);
router.get("/:id", getCompanyById);
router.delete("/:id", deleteCompany);

export default router;
