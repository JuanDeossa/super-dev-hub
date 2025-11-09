// Controlador de autenticación
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN_EXPIRATION_MINUTES = 0.5; // 30 segundos
const REFRESH_TOKEN_EXPIRATION_HOURS = 0.02; // 1.2 minutos
const REDIRECT_URL = process.env.CLIENT_ORIGINS.split(";;;")[0]; // Usar el primer origen como URL de redirección

export const authController = {
  googleCallback: (req, res) => {
    // Access token
    const accessToken = jwt.sign(
      {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        provider: req.user.provider,
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 * ACCESS_TOKEN_EXPIRATION_MINUTES }
    );

    // Refresh token
    const refreshToken = jwt.sign(
      {
        id: req.user.id,
        type: "refresh",
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 * REFRESH_TOKEN_EXPIRATION_HOURS }
    );

    // Enviar refresh token como cookie httpOnly y access token en la URL
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Solo en HTTPS
      sameSite: "lax", // O "none" si usas dominios distintos y HTTPS
      maxAge: 1000 * 60 * 60 * REFRESH_TOKEN_EXPIRATION_HOURS,
      path: "/", // Ajusta si es necesario
    });
    res.redirect(`${REDIRECT_URL}/auth/callback?token=${accessToken}`);
  },

  googleFailure: (_req, res) => {
    res.status(401).json({ error: "Autenticación con Google fallida" });
  },

  /**
   * Refresca el access token usando el refresh token de la cookie httpOnly
   * Endpoint seguro: solo el backend puede leer la cookie
   * Responde con un nuevo access token si el refresh token es válido
   */
  refreshToken: (req, res) => {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return res
          .status(401)
          .json({ error: "Refresh token no proporcionado" });
      }

      // Verificar y decodificar el refresh token
      const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
      if (payload.type !== "refresh") {
        return res.status(401).json({ error: "Token inválido" });
      }

      // Puedes agregar lógica para verificar si el usuario sigue activo, etc.
      // Generar nuevo access token
      const accessToken = jwt.sign(
        {
          id: payload.id,
          // Puedes incluir más datos si lo deseas, pero solo si están en el refresh token
        },
        process.env.JWT_SECRET,
        { expiresIn: 60 * ACCESS_TOKEN_EXPIRATION_MINUTES }
      );

      return res.json({ accessToken });
    } catch (err) {
      return res
        .status(401)
        .json({ error: "Refresh token inválido o expirado" });
    }
  },

  /**
   * Cierra la sesión eliminando la cookie del refresh token
   */
  logout: (_req, res) => {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    res.status(200).json({ message: "Sesión cerrada correctamente" });
  },
};
