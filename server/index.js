import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { createServer } from "node:http";
import { WebSocketServer } from "ws";

import { errorHandler } from "./middlewares/errorHandler.js";

const PORT = process.env.PORT || 8080;
const CLIENT_ORIGINS = process.env.CLIENT_ORIGINS.split(";;;") || [
  "http://localhost:5173",
];

const DELAY_MS = 1200;
const TEMPERATURE_INTERVAL_MS = 1500;

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cookieParser());

app.use(
  cors({
    origin: CLIENT_ORIGINS,
    credentials: true,
  })
);

app.use(express.json());

// Configurar WebSocket
wss.on("connection", (ws) => {
  console.log("Cliente conectado al WebSocket");

  // Enviar temperatura cada 3 segundos
  const temperatureInterval = setInterval(() => {
    const temperatura = Math.floor(Math.random() * 46); // Random entre 0 y 45
    const mensaje = `Temperatura en la ciudad: ${temperatura}°`;

    if (ws.readyState === ws.OPEN) {
      ws.send(mensaje);
      // console.log(`📊 ${mensaje}`);
    }
  }, TEMPERATURE_INTERVAL_MS);

  // Limpiar cuando se desconecte
  ws.on("close", () => {
    console.log("Cliente desconectado del WebSocket");
    clearInterval(temperatureInterval);
  });

  ws.on("error", (error) => {
    console.error("Error en WebSocket:", error);
    clearInterval(temperatureInterval);
  });
});

server.listen(PORT, () => {
  console.log(`Mock backend escuchando en el puerto ${PORT}`);
  console.log(`WebSocket disponible en: ws://localhost:${PORT}`);
});

app.get("/api/test", (_req, res) => {
  setTimeout(() => {
    res.status(200).json({
      success: true,
      message: "¡Servidor backend funcionando correctamente!",
    });
  }, DELAY_MS);
});

// Middleware global de manejo de errores
app.use(errorHandler);
