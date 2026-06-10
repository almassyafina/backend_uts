import express from "express";
import { createuser, getuser, showuser, updateuser, deleteuser } from "../controllers/userControllers";



const router = express.Router();

router.get("/", getuser);
router.post("/", createuser);
router.get("/:id", showuser);
router.put("/:id", updateuser);
router.delete("/:id", deleteuser);
 


export default router;