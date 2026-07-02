import dotenv from "dotenv";
// import path from "path";
dotenv.config();
// dotenv.config({ path: path.resolve(".env") });

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";


import authRoutes from './routes/authRoutes.js';
import incomeRoutes from './routes/incomeRoutes.js';
import aiRoutes from "./routes/aiRoutes.js";
import expenseRoutes from './routes/expenseRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import userRoutes from "./routes/userRoutes.js";


const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/user", authRoutes);
app.use("/api/income",incomeRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

// start server first
app.listen(5000, async () => {
  console.log("Server is running on http://localhost:5000");

  // connect DB separately
  try {
    await connectDB();
  } catch (err) {
    console.log("⚠️ DB connection failed, server still running");
  }


  console.log("ALL ENV KEYS:", process.env);
  console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);
});