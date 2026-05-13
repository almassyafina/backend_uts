import express from "express";
import { createpembicara, getpembicara, updatePembicara, deletePembicara, showpembicara } from "../controllers/pembicaraControllers";



const router = express.Router();

router.get("/", getpembicara);
router.post("/", createpembicara);
router.get("/:id", showpembicara);
router.put("/:id", updatePembicara);
router.delete("/:id", deletePembicara);
 


export default router;