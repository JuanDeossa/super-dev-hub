import { Router } from "express";
import { passport } from "../config/passport.js";
import { authController } from "../controllers/authController.js";

export const authRouter = Router();

// Iniciar login con Google
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback de Google
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/google/failure",
    prompt: "select_account",
  }),
  authController.googleCallback
);

// Ruta de fallo
authRouter.get("/google/failure", authController.googleFailure);

// Ruta para refrescar el access token usando el refresh token de la cookie
authRouter.post("/refresh", authController.refreshToken);

// Logout: elimina la cookie del refresh token
authRouter.post("/logout", authController.logout);
