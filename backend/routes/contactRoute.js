import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import {
  submitContact,
  getAllContacts,
  deleteContact,
  markAsRead,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", submitContact);
router.get("/", adminAuth, getAllContacts);
router.delete("/:id", adminAuth, deleteContact);
router.put("/:id/read", adminAuth, markAsRead);

export default router;

