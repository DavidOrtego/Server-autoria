const express = require("express");
const router = express.Router();


// Importamos el controlador de usuarios
const userController = require("../controllers/userController");


// Importamos los middlewares de seguridad
const { authenticateToken, isAdmin } = require("../middlewares/authMiddleware");


// Importamos validadores y manejador de errores de validación
const { handleValidationErrors } = require("../middlewares/errorHandler");
const { userIdValidator, putUserValidator } = require("../validators/userValidator");


// Verificar que hay un usuario logueado y guardar los datos en req.user
router.use(authenticateToken);


// RUTAS DE USUARIOS


// GET /users -> Obtiene todos los usuarios
// isAdmin para que solo el usuario administrador pueda acceder
router.get("/", isAdmin, userController.getAllUsers);

// GET /users/:userId -> Obtiene la información de un usuario específico
router.get("/:userId", userIdValidator, handleValidationErrors, userController.getUserById);

// PUT /users/:userId -> Actualiza la información de un usuario
router.put(
  "/:userId",
  userIdValidator,
  putUserValidator,
  handleValidationErrors,
  userController.putUser
);
