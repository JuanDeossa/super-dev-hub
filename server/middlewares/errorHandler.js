export const errorHandler = (err, _req, res) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";
  // Si es un error de Sequelize, extrae detalles
  let details = undefined;
  if (err.errors && Array.isArray(err.errors)) {
    details = err.errors.map(e => e.message);
  } else if (err.parent && err.parent.detail) {
    details = err.parent.detail;
  }
  if (typeof res.status === "function") {
    res.status(status).json({ error: message, details });
  }
};
