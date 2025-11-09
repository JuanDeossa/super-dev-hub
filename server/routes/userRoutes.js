import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

export const userRouter = Router();

userRouter.get("/", authenticateToken, userController.getAllUsers);
