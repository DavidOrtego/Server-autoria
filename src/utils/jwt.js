const jwt = require("jsonwebtoken");

// Configuración de JWT (en producción, usar variables de entorno)
const JWT_SECRET = process.env.JWT_SECRET || "secreto_por_defecto";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

/**
 * Genera un token de acceso JWT
 * @param {Object} payload - Datos a incluir en el token
 * @returns {string} Token JWT
 */
const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: "vives-api",
    audience: "vives-client",
  });
};



const generateTokens = (user) => {
  const payload = {
    id: user.id_user,
    email: user.email,
    rol: user.rol,
  };

  return {
    token: generateAccessToken(payload),
  };
};

/**
 * Verifica un token de acceso
 * @param {string} token - Token a verificar
 * @returns {Object} Payload decodificado
 * @throws {Error} Si el token es inválido o expirado
 */
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: "vives-api",
      audience: "vives-client",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token expirado");
    } else if (error.name === "JsonWebTokenError") {
      throw new Error("Token inválido");
    }
    throw error;
  }
};



/**
 * Decodifica un token sin verificar (útil para debugging)
 * @param {string} token - Token a decodificar
 * @returns {Object} Payload decodificado
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateAccessToken,
  generateTokens,
  verifyAccessToken,
  decodeToken,
};