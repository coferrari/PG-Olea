const jwt = require("jsonwebtoken");

// middleware to validate token (rutas protegidas)
const isAdmin = (req, res, next) => {
  const token = req.headers["authorization"]
    ? req.headers["authorization"].replace("Bearer ", "")
    : undefined;
  if (!token) return res.status(401).json({ error: "Acceso denegado" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verified.admin) {
      return res.status(401).json({ error: "Acceso denegado" });
    }
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "token no es válido" });
  }
};

module.exports = isAdmin;
