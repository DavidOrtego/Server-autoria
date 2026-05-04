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

/**
 * Crea un nuevo gasto
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 201 y el gasto creado
 */
const postExpense = async (req, res, next) => {
    try {
        const expenseData = req.body;
        const newId = await createExpense(expenseData);
        const newExpense = {
            id_expense: newId,
            ...expenseData,
        };

        res.status(201).json({
            code: 201,
            title: "Created",
            message: `Gasto con id ${newId} creado correctamente`,
            data: newExpense,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Actualiza un gasto existente
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200 y los datos actualizados
 */
const putExpense = async (req, res, next) => {
    try {
        const { expenseId } = req.params;
        const expenseData = req.body;
        await updateExpense(expenseId, expenseData);
        const updatedExpense = await findExpenseById(expenseId);

        res.status(200).json({
            code: 200,
            title: "Success",
            message: `Gasto con id ${expenseId} actualizado correctamente`,
            data: updatedExpense,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Elimina un gasto
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200
 */
const deleteAExpense = async (req, res, next) => {
    try {
        const { expenseId } = req.params;
        await deleteExpense(expenseId);
        res.status(200).json({
            code: 200,
            title: "Success",
            message: `Gasto con id ${expenseId} eliminado correctamente`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllExpenses,
    getExpenseById,
    postExpense,
    putExpense,
    deleteAExpense,
};
