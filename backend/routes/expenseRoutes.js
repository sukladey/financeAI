import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  addExpense,
  getExpense,
  deleteExpense
} from "../controllers/expenseController.js";

const router =
  express.Router();

router.post(
  "/add",
  authMiddleware,
  addExpense
);

router.get(
  "/all",
  authMiddleware,
  getExpense
);

router.delete(
  "/delete/:id",
  authMiddleware,
  deleteExpense
);

export default router;