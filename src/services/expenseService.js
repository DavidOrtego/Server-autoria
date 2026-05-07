const { db } = require("../config/database");

const findAllExpenses = async (user, filters = {}) => {
    let query = db("Expenses as e")
        .select(
            "e.id_expense",
            "e.amount",
            "e.description",
            "e.date",
            "e.id_user",
            "u.name as user_name",
            "e.id_house",
            "h.name as house_name"
        )
        .join("Users as u", "e.id_user", "u.id_user")
        .join("Houses as h", "e.id_house", "h.id_house");

    if (user.rol !== 'admin') {
        query = query.where(function() {
            this.whereIn('e.id_house', function() {
                this.select('id_house').from('HouseMembers').where('id_user', user.id);
            }).orWhere('e.id_user', user.id);
        });
    }
    //Buscador y filtado dinamico
    //firtar por minimo
    if (filters.minAmount) {
        query = query.where('e.amount', '>=', filters.minAmount);
    }
    //firtar por maximo
    if (filters.maxAmount) {
        query = query.where('e.amount', '<=', filters.maxAmount);
    }
    //Buscar por decripcion
    if (filters.search) {
        query = query.where('e.description', 'like', `%${filters.search}%`);
    }
    //ordenar
    if (filters.sortBy) {
        const order = filters.order && filters.order.toLowerCase() === 'asc' ? 'asc' : 'desc';
        query = query.orderBy(`e.${filters.sortBy}`, order);
    }

    return await query;
}

const findExpenseById = async (expenseId, user) => {
    let query = db("Expenses as e")
        .select(
            "e.id_expense",
            "e.amount",
            "e.description",
            "e.date",
            "e.id_user",
            "u.name as user_name",
            "e.id_house",
            "h.name as house_name"
        )
        .join("Users as u", "e.id_user", "u.id_user")
        .join("Houses as h", "e.id_house", "h.id_house")
        .where({ "e.id_expense": expenseId });

    if (user.rol !== 'admin') {
        query = query.where(function() {
            this.whereIn('e.id_house', function() {
                this.select('id_house').from('HouseMembers').where('id_user', user.id);
            }).orWhere('e.id_user', user.id);
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

    // Verificar que el usuario asignado al gasto pertenece a la casa
    const targetUserMembership = await db("HouseMembers")
        .where({ id_house: expenseData.id_house, id_user: expenseData.id_user })
        .first();
    
    if (!targetUserMembership) {
        throw { status: 400, message: "El usuario asignado no pertenece a esta casa" };
    }

    // Sanitizar datos para insertar solo campos válidos
    const dataToInsert = {
        amount: expenseData.amount,
        description: expenseData.description,
        date: expenseData.date, // MySQL espera YYYY-MM-DD
        id_user: expenseData.id_user,
        id_house: expenseData.id_house
    };

    const [id] = await db("Expenses").insert(dataToInsert);
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
        // Si se está cambiando el usuario o la casa, verificar que el usuario pertenece a la casa
        if (updateData.id_user || updateData.id_house) {
            const finalUserId = updateData.id_user || existingExpense.id_user;
            const finalHouseId = updateData.id_house || existingExpense.id_house;

            const targetMembership = await db("HouseMembers")
                .where({ id_house: finalHouseId, id_user: finalUserId })
                .first();
            
            if (!targetMembership) {
                throw { status: 400, message: "El usuario asignado no pertenece a esa casa" };
            }
        }

        await db("Expenses").where({ id_expense: expenseId }).update(updateData);
    }
}

const deleteExpense = async (expenseId, user) => {
    await findExpenseById(expenseId, user);
    
    await db("Expenses").where({ id_expense: expenseId }).del();
    return { message: "Gasto eliminado correctamente" };
}

const findExpensesByHouse = async (houseId, user, filters = {}) => {
    // Verificar acceso a la casa
    if (user.rol !== 'admin') {
        const membership = await db("HouseMembers")
            .where({ id_house: houseId, id_user: user.id })
            .first();
        if (!membership) {
            throw { status: 403, message: "No tienes acceso a los gastos de esta casa" };
        }
    }

    let query = db("Expenses as e")
        .select(
            "e.id_expense",
            "e.amount",
            "e.description",
            "e.date",
            "e.id_user",
            "u.name as user_name",
            "e.id_house"
        )
        .join("Users as u", "e.id_user", "u.id_user")
        .where({ "e.id_house": houseId });
        
    if (filters.minAmount) {
        query = query.where('e.amount', '>=', filters.minAmount);
    }
    if (filters.maxAmount) {
        query = query.where('e.amount', '<=', filters.maxAmount);
    }
    if (filters.search) {
        query = query.where('e.description', 'like', `%${filters.search}%`);
    }
    if (filters.sortBy) {
        const order = filters.order && filters.order.toLowerCase() === 'asc' ? 'asc' : 'desc';
        query = query.orderBy(`e.${filters.sortBy}`, order);
    }

    return await query;
}

const findExpensesByUser = async (userId, user, filters = {}) => {
    let query = db("Expenses as e")
        .select(
            "e.id_expense",
            "e.amount",
            "e.description",
            "e.date",
            "e.id_user",
            "u.name as user_name",
            "e.id_house",
            "h.name as house_name"
        )
        .join("Users as u", "e.id_user", "u.id_user")
        .join("Houses as h", "e.id_house", "h.id_house")
        .where("e.id_user", userId);

    // Si no es admin y no es su propio perfil
    if (user.rol !== 'admin' && user.id !== parseInt(userId)) {
        // Solo puede ver los gastos del usuario en las casas que comparten
        query = query.whereIn('e.id_house', function() {
            this.select('id_house').from('HouseMembers').where('id_user', user.id);
        });

        // Verificamos si comparten casa
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

    if (filters.minAmount) {
        query = query.where('e.amount', '>=', filters.minAmount);
    }
    if (filters.maxAmount) {
        query = query.where('e.amount', '<=', filters.maxAmount);
    }
    if (filters.search) {
        query = query.where('e.description', 'like', `%${filters.search}%`);
    }
    if (filters.sortBy) {
        const order = filters.order && filters.order.toLowerCase() === 'asc' ? 'asc' : 'desc';
        query = query.orderBy(`e.${filters.sortBy}`, order);
    }

    return await query;
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
