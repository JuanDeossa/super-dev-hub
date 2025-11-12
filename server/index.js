import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

import { createServer } from "http";
import { WebSocketServer } from "ws";

import { sequelize } from "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const PORT = process.env.PORT || 8080;
const CLIENT_ORIGINS = process.env.CLIENT_ORIGINS?.split(";;;") || [
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

// Rutas y middlewares
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

// Crear servidor HTTP y WebSocket
const server = createServer(app);
const wss = new WebSocketServer({ server });


wss.on("connection", (ws) => {
  console.log("Cliente WebSocket conectado");
  ws.on("message", (message) => {
    console.log("Mensaje recibido por WS:", message.toString());
    ws.send(`Echo: ${message}`);
  });
  ws.on("close", () => {
    console.log("Cliente WebSocket desconectado");
  });
});

// Enviar ping a todos los clientes cada 5 segundos
setInterval(() => {
  const now = new Date();
  const hora = now.getHours().toString().padStart(2, '0');
  const minuto = now.getMinutes().toString().padStart(2, '0');
  const segundo = now.getSeconds().toString().padStart(2, '0');
  const mensajePing = `ping ${hora}:${minuto}:${segundo}`;
  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // 1 = OPEN
      client.send(mensajePing);
    }
  });
}, 5000);

// Sincronizar base de datos y arrancar servidor
try {
  await sequelize.sync({ alter: true });
  console.log("Tablas sincronizadas correctamente");
  server.listen(PORT, () => {
    console.log(`Servidor backend (HTTP + WS) escuchando en el puerto ${PORT}`);
  });
} catch (err) {
  console.error("Error al sincronizar las tablas:", err);
}
