const express = require("express");
const router = express.Router();

// Importamos el controlador de gastos
const expenseController = require("../controllers/expenseController");

// Importamos los middlewares de seguridad
const { authenticateToken } = require("../middlewares/authMiddleware");

// Importamos validadores y manejador de errores de validación
const { handleValidationErrors } = require("../middlewares/errorHandler");
const { expenseIdValidator, postExpenseValidator, putExpenseValidator } = require("../validators/expenseValidator");

// Verificar que hay un usuario logueado
router.use(authenticateToken);

// RUTAS DE GASTOS

// GET /expenses -> Obtiene todos los gastos
router.get("/", expenseController.getAllExpenses);

// GET /expenses/:expenseId -> Obtiene un gasto específico
router.get("/:expenseId", expenseIdValidator, handleValidationErrors, expenseController.getExpenseById);

// POST /expenses -> Crea un nuevo gasto
router.post("/", postExpenseValidator, handleValidationErrors, expenseController.postExpense);

// PUT /expenses/:expenseId -> Actualiza un gasto
router.put(
    "/:expenseId",
    expenseIdValidator,
    putExpenseValidator,
    handleValidationErrors,
    expenseController.putExpense
);

// DELETE /expenses/:expenseId -> Elimina un gasto
router.delete("/:expenseId", expenseIdValidator, handleValidationErrors, expenseController.deleteAExpense);

// GET /expenses/house/:houseId -> Obtiene los gastos de una casa
router.get("/house/:houseId", expenseController.getExpensesByHouse);

// GET /expenses/user/:userId -> Obtiene los gastos de un usuario
router.get("/user/:userId", expenseController.getExpensesByUser);

module.exports = router;
