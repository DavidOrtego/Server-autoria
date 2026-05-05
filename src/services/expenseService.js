const { db } = require("../config/database");

const findAllExpenses = async (user) => {
    let query = db("Expenses").select(
        "id_expense",
        "amount",
        "description",
        "date",
        "id_user",
        "id_house"
    );

    if (user.rol !== 'admin') {
        query = query.where(function() {
            this.whereIn('id_house', function() {
                this.select('id_house').from('HouseMembers').where('id_user', user.id);
            }).orWhere('id_user', user.id);
        });
    }

    return await query;
}

const findExpenseById = async (expenseId, user) => {
    let query = db("Expenses")
        .select(
            "id_expense",
            "amount",
            "description",
            "date",
            "id_user",
            "id_house"
        )
        .where({ id_expense: expenseId });

    if (user.rol !== 'admin') {
        query = query.where(function() {
            this.whereIn('id_house', function() {
                this.select('id_house').from('HouseMembers').where('id_user', user.id);
            }).orWhere('id_user', user.id);
        });
    }

    const expense = await query.first();

    if (!expense) {
        throw { status: 404, message: "Gasto no encontrado o sin acceso" };
    }

    return expense;
}

const createExpense = async (expenseData, user) => {
    // Verificar si el usuario tiene acceso a la casa
    if (user.rol !== 'admin') {
        const membership = await db("HouseMembers")
            .where({ id_house: expenseData.id_house, id_user: user.id })
            .first();
        if (!membership) {
            throw { status: 403, message: "No tienes permiso para registrar gastos en esta casa" };
        }
    }

    const [id] = await db("Expenses").insert(expenseData);
    return id;
}

const updateExpense = async (expenseId, newExpenseData, user) => {
    const existingExpense = await findExpenseById(expenseId, user);

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

const deleteExpense = async (expenseId, user) => {
    await findExpenseById(expenseId, user);
    
    await db("Expenses").where({ id_expense: expenseId }).del();
    return { message: "Gasto eliminado correctamente" };
}

const findExpensesByHouse = async (houseId, user) => {
    // Verificar acceso a la casa
    if (user.rol !== 'admin') {
        const membership = await db("HouseMembers")
            .where({ id_house: houseId, id_user: user.id })
            .first();
        if (!membership) {
            throw { status: 403, message: "No tienes acceso a los gastos de esta casa" };
        }
    }

    const expenses = await db("Expenses")
        .select(
            "id_expense",
            "amount",
            "description",
            "date",
            "id_user",
            "id_house"
        )
        .where({ id_house: houseId });
    return expenses;
}

const findExpensesByUser = async (userId, user) => {
    // Un usuario solo puede ver sus propios gastos, a menos que sea admin
    // o que comparta casa con el usuario dueño del gasto.
    if (user.rol !== 'admin' && user.id !== parseInt(userId)) {
        const sharedHouses = await db("HouseMembers")
            .whereIn('id_house', function() {
                this.select('id_house').from('HouseMembers').where('id_user', user.id);
            })
            .where('id_user', userId)
            .first();
        
        if (!sharedHouses) {
            throw { status: 403, message: "No tienes permiso para ver los gastos de este usuario" };
        }
    }

    const expenses = await db("Expenses")
        .select(
            "id_expense",
            "amount",
            "description",
            "date",
            "id_user",
            "id_house"
        )
        .where({ id_user: userId });
    return expenses;
}

module.exports = {
    findAllExpenses,
    findExpenseById,
    createExpense,
    updateExpense,
    deleteExpense,
    findExpensesByHouse,
    findExpensesByUser,
}
