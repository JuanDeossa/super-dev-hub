import { Router } from "express";
import { userController } from "../controllers/userController.js";

export const userRouter = Router();

userRouter.get("/", userController.getAllUsers);
