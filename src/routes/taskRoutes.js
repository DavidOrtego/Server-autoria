const express = require("express");
const router = express.Router();

// Importamos el controlador de tareas
const taskController = require("../controllers/taskController");

// Importamos los middlewares de seguridad
const { authenticateToken } = require("../middlewares/authMiddleware");

// Importamos validadores y manejador de errores de validación
const { handleValidationErrors } = require("../middlewares/errorHandler");
const { taskIdValidator, postTaskValidator, putTaskValidator } = require("../validators/taskValidator");

// Verificar que hay un usuario logueado
router.use(authenticateToken);

// RUTAS DE TAREAS

// GET /tasks -> Obtiene todas las tareas
router.get("/", taskController.getAllTasks);

// GET /tasks/:taskId -> Obtiene una tarea específica
router.get("/:taskId", taskIdValidator, handleValidationErrors, taskController.getTaskById);

// POST /tasks -> Crea una nueva tarea
router.post("/", postTaskValidator, handleValidationErrors, taskController.postTask);

// PUT /tasks/:taskId -> Actualiza una tarea
router.put(
    "/:taskId",
    taskIdValidator,
    putTaskValidator,
    handleValidationErrors,
    taskController.putTask
);

// DELETE /tasks/:taskId -> Elimina una tarea
router.delete("/:taskId", taskIdValidator, handleValidationErrors, taskController.deleteATask);

// GET /tasks/house/:houseId -> Obtiene las tareas de una casa
router.get("/house/:houseId", taskController.getTasksByHouse);

// GET /tasks/user/:userId -> Obtiene las tareas de un usuario
router.get("/user/:userId", taskController.getTasksByUser);

module.exports = router;
