import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

import { sequelize } from "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const PORT = process.env.PORT || 8080;
const CLIENT_ORIGINS = process.env.CLIENT_ORIGINS.split(";;;") || [
  "http://localhost:5173",
];

const DELAY_MS = 1200;

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: CLIENT_ORIGINS,
    credentials: true,
  })
);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Mock backend escuchando en el puerto ${PORT}`);
});

app.get("/api/test", (_req, res) => {
  setTimeout(() => {
    res.status(200).json({
      success: true,
      message: "¡Servidor backend funcionando correctamente!",
    });
  }, DELAY_MS);
});

app.use("/api/users", userRouter);

// Middleware global de manejo de errores
app.use(errorHandler);

try {
  await sequelize.sync({ alter: true });
  console.log("Tablas sincronizadas correctamente");
  app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en el puerto ${PORT}`);
  });
} catch (err) {
  console.error("Error al sincronizar las tablas:", err);
}
