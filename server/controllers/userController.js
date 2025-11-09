// Controlador para usuarios
import { userService } from "../services/userService.js";

export const userController = {
  async getAllUsers(_req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  },
};
