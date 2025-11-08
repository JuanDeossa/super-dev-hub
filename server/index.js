import "dotenv/config";
import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 8080;
const CLIENT_ORIGINS = process.env.CLIENT_ORIGINS.split(";;;") || [
  "http://localhost:5173",
];

const DELAY_MS = 1200;

const app = express();

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
