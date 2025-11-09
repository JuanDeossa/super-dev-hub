// Servicio para operaciones de usuario
import { User } from "../models/User.js";

export const userService = {
  /**
   * Lista todos los usuarios, omitiendo el campo contraseña
   * @returns {Promise<Array>} Array de usuarios sin el campo password
   */
  async getAllUsers() {
    // Excluye el campo 'password' en la consulta
    return User.findAll({
      attributes: { exclude: ["password", "active", "deletedAt", "lastLogin"] },
    });
  },
};
