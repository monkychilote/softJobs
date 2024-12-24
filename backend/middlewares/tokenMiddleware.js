const jwt = require("jsonwebtoken");

const tokenMiddleware = (req, res, next) => {
  // Obtener el token de las cabeceras
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ error: "Token required" });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardar el payload del token en req.user para su uso posterior
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = tokenMiddleware;
