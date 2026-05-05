const express = require("express");
const router = express.Router();


// Importar el controlador
const authController = require("../controllers/authController");


// Importar los validadores
const {
    registerValidators,
    loginValidators,
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



// Ruta para obtener mis datos
router.get("/me", authenticateToken, authController.me);

module.exports = router;