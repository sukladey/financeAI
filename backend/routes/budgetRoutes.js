import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  addBudget,
  getBudget,
  deleteBudget
} from "../controllers/budgetController.js";

const router =
  express.Router();

router.post(
  "/add",
  authMiddleware,
  addBudget
);

router.get(
  "/all",
  authMiddleware,
  getBudget
);

router.delete(
  "/delete/:id",
  authMiddleware,
  deleteBudget
);

export default router;