import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  updatePassword
} from '../controllers/userController.js';
import User from "../models/userModel.js";
import authMiddleware from '../middleware/authMiddleware.js';


const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);



// protected Routes
userRouter.get("/me",authMiddleware, getCurrentUser);
userRouter.put("/profile", authMiddleware, updateProfile);
userRouter.put("/password", authMiddleware, updatePassword);



export default userRouter;