import express from "express";
import { createEvent, deleteEvent, getEvent, showEvent, updateEvent } from "../controllers/eventControllers";


const router = express.Router();

router.get("/", getEvent);
router.post("/", createEvent);
router.get("/:id", showEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);


export default router;