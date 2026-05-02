const { verifyAccessToken } = require("../utils/jwt");

/**
 * Middleware para verificar si el usuario está autenticado
 * Valida el JWT y guarda los datos del usuario en req.user
 */
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Acceso denegado. No se proporcionó un token válido.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decodedPayload = verifyAccessToken(token);
    req.user = decodedPayload;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Token inválido o expirado",
    });
  }
};

/**
 * Middleware para verificar si el usuario es administrador
 * IMPORTANTE: Este middleware siempre debe ponerse en la ruta DESPUÉS de authenticateToken
 */
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "No autenticado",
    });
  }
 
  if (req.user.rol !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Acceso denegado. Se requieren permisos de administrador.",
    });
  }


  next();
};


module.exports = {
  authenticateToken,
  isAdmin,
};
