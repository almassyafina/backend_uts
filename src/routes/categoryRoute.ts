import express from "express";
import { createCategories, deleteCategory, getCategories, showCategory, updateCategory } from "../controllers/categoryControllers";


const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategories);
router.get("/:id", showCategory );
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);



export default router;