const express = require("express");
const router = express.Router();


// Importar el controlador
const authController = require("../controllers/authController");


// Importar los validadores
const {
    registerValidators,
    loginValidators,
    refreshTokenValidators,
    changePasswordValidators,
    forgotPasswordValidators,
} = require("../validators/authValidator");


// Importar el middleware de autenticación
const { authenticateToken } = require("../middlewares/authMiddleware");


// Importar el middleware que maneja los errores de express-validator
const { handleValidationErrors } = require("../middlewares/errorHandler");


// Ruta para registrar usuario
router.post(
  "/register",
  registerValidators,
  handleValidationErrors,
  authController.registerUser,
);

// Ruta para login
router.post(
  "/login",
  loginValidators,
  handleValidationErrors,
  authController.loginUser,
);

// Ruta para refrescar token
router.post(
  "/refresh-token",
  refreshTokenValidators,
  handleValidationErrors,
  authController.refreshToken,
);

// Ruta para cambiar contraseña (Requiere estar logueado, usamos authenticateToken)
router.post(
  "/change-password",
  authenticateToken,
  changePasswordValidators,
  handleValidationErrors,
  authController.changePassword,
);

// Ruta para solicitar reseteo de contraseña
router.post(
  "/forgot-password",
  forgotPasswordValidators,
  handleValidationErrors,
  authController.forgotPassword,
);

// Ruta para obtener mis datos
router.get("/me", authenticateToken, authController.me);

module.exports = router;