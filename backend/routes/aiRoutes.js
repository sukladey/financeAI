import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { askFinanceAI } from "../controllers/aiController.js";

const router = express.Router();

router.post(
  "/chat",
  // authMiddleware,
  askFinanceAI
);

export default router;