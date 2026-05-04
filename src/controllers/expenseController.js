const {
    findAllExpenses,
    findExpenseById,
    createExpense,
    updateExpense,
    deleteExpense,
    findExpensesByHouse,
    findExpensesByUser,
} = require("../services/expenseService");

/**
 * Obtiene todos los gastos
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200 y los datos
 */
const getAllExpenses = async (req, res, next) => {
    try {
        const expenses = await findAllExpenses();
        res.status(200).json({
            code: 200,
            title: "Success",
            message: "Gastos obtenidos correctamente",
            data: expenses,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Obtiene un gasto por su ID
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200 y los datos
 */
const getExpenseById = async (req, res, next) => {
    try {
        const { expenseId } = req.params;
        const expense = await findExpenseById(expenseId);
        res.status(200).json({
            code: 200,
            title: "Success",
            message: `Gasto con id ${expenseId} obtenido correctamente`,
            data: expense,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllExpenses,
    getExpenseById,
};
