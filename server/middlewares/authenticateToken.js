// Middleware para verificar el access token JWT
import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({
      error: "INVALID_TOKEN",
      message: "No se proporcionó token de acceso.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          error: "EXPIRED_TOKEN",
          message: "El token de acceso ha expirado. Solicite uno nuevo.",
        });
      }
      return res.status(401).json({
        error: "INVALID_TOKEN",
        message: "El token de acceso no es válido.",
      });
    }
    req.user = user;
    next();
  });
}
