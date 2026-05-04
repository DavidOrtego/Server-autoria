const { db } = require("../config/database");

const findAllExpenses = async () => {
    const expenses = await db("Expenses").select(
        "id_expense",
        "amount",
        "description",
        "date",
        "id_user",
        "id_house"
    );
    return expenses;
}

const findExpenseById = async (expenseId) => {
    const expense = await db("Expenses")
        .select(
            "id_expense",
            "amount",
            "description",
            "date",
            "id_user",
            "id_house"
        )
        .where({ id_expense: expenseId })
        .first();

    if (!expense) {
        throw { status: 404, message: "Gasto no encontrado" };
    }

    return expense;
}

const createExpense = async (expenseData) => {
    const [id] = await db("Expenses").insert(expenseData);
    return id;
}

const updateExpense = async (expenseId, newExpenseData) => {
    const existingExpense = await db("Expenses")
        .where({ id_expense: expenseId })
        .first();
    
    if (!existingExpense) {
        throw { status: 404, message: "Gasto no encontrado" };
    }

    const updateData = {};
    if (newExpenseData.amount) updateData.amount = newExpenseData.amount;
    if (newExpenseData.description) updateData.description = newExpenseData.description;
    if (newExpenseData.date) updateData.date = newExpenseData.date;
    if (newExpenseData.id_user) updateData.id_user = newExpenseData.id_user;
    if (newExpenseData.id_house) updateData.id_house = newExpenseData.id_house;

    if (Object.keys(updateData).length > 0) {
        await db("Expenses").where({ id_expense: expenseId }).update(updateData);
    }
}

module.exports = {
    findAllExpenses,
    findExpenseById,
    createExpense,
    updateExpense,
}
