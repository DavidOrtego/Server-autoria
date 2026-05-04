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

module.exports = {
    findAllExpenses,
    findExpenseById,
}
