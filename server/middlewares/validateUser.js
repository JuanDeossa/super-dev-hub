export const validateUser = (req, res, next) => {
  const { email, name, password, role, provider } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "El email y el nombre son obligatorios" });
  }
  if (provider === "local" || provider === "manual") {
    if (!password || password.length < 6) {
      return res.status(400).json({ error: "La contraseña es obligatoria y debe tener al menos 6 caracteres" });
    }
  }

  if (role && !["developer", "super_admin", "admin", "operator", "guest"].includes(role)) {
    return res.status(400).json({ error: "Rol no válido" });
  }


  next();
};
