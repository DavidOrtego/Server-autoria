const {
  findAllExpenses,
  findExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  findExpensesByHouse,
  findExpensesByUser,
} = require("../services/expenseService");

const isBlockedTestMode = (text) => {
  if (typeof text !== "string") {
    return false;
  }
  return /\b(TEST|PRUEBA)\b/i.test(text);
};

const rejectTestModeAttempt = (req, res) => {
    res.status(422).json({
        code: 422,
        title: "error",
        message: "Modo pruebas denegado",
});
};

/**
 * Obtiene todos los gastos
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200 y los datos
 */
const getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await findAllExpenses(req.user, req.query);
    res.status(200).json({
      code: 200,
      title: "Success",
      message: "Expenses retrieved successfully",
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
    const expense = await findExpenseById(expenseId, req.user);
    res.status(200).json({
      code: 200,
      title: "Success",
      message: `Expense with id ${expenseId} retrieved successfully`,
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

    if (
      isBlockedTestMode(expenseData.description) ||
      isBlockedTestMode(expenseData.observations)
    ) {
      return rejectTestModeAttempt(req, res);
    }

    const newId = await createExpense(expenseData, req.user);
    const newExpense = {
      id_expense: newId,
      ...expenseData,
    };

    res.status(201).json({
      code: 201,
      title: "Created",
      message: `Expense with id ${newId} created successfully`,
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

    if (
      isBlockedTestMode(expenseData.description)
    ) {
      return rejectTestModeAttempt(req, res);
    }

    await updateExpense(expenseId, expenseData, req.user);
    const updatedExpense = await findExpenseById(expenseId, req.user);

    res.status(200).json({
      code: 200,
      title: "Success",
      message: `Expense with id ${expenseId} updated successfully`,
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
    await deleteExpense(expenseId, req.user);
    res.status(200).json({
      code: 200,
      title: "Success",
      message: `Expense with id ${expenseId} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene los gastos de una casa específica
 */
const getExpensesByHouse = async (req, res, next) => {
  try {
    const { houseId } = req.params;
    const expenses = await findExpensesByHouse(houseId, req.user, req.query);
    res.status(200).json({
      code: 200,
      title: "Success",
      message: `Expenses for house ${houseId} retrieved successfully`,
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene los gastos de un usuario específico
 */
const getExpensesByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const expenses = await findExpensesByUser(userId, req.user, req.query);
    res.status(200).json({
      code: 200,
      title: "Success",
      message: `Expenses for user ${userId} retrieved successfully`,
      data: expenses,
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
  getExpensesByHouse,
  getExpensesByUser,
};
