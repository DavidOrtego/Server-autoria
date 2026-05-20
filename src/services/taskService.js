const { db } = require("../config/database");

const findAllTasks = async (user, filters = {}) => {
    let query = db("Tasks as t")
        .select(
            "t.id_task",
            "t.name",
            "t.description",
            "t.state",
            "t.expiration_date",
            "t.id_house",
            "h.name as house_name",
            "t.id_user",
            "u.name as user_name",
            "u.image as user_image"
        )
        .leftJoin("Users as u", "t.id_user", "u.id_user")
        .join("Houses as h", "t.id_house", "h.id_house");

    if (user.rol !== 'admin') {
        query = query.where(function() {
            this.whereIn('t.id_house', function() {
                this.select('id_house').from('HouseMembers').where('id_user', user.id);
            }).orWhere('t.id_user', user.id);
        });
    }

    //Buscador y filtado dinamico
    //buscar por estado
    if (filters.state) {
        query = query.where('t.state', filters.state);
    }
    //buscar por nombre
    if (filters.search) {
        query = query.where(function() {
            this.where('t.name', 'like', `%${filters.search}%`)
                .orWhere('t.description', 'like', `%${filters.search}%`);
        });
    }
    //ordenar
    if (filters.sortBy) {
        const order = filters.order && filters.order.toLowerCase() === 'desc' ? 'desc' : 'asc';
        query = query.orderBy(`t.${filters.sortBy}`, order);
    }

    return await query;
}

const findTaskById = async (taskId, user) => {
    let query = db("Tasks as t")
        .select(
            "t.id_task",
            "t.name",
            "t.description",
            "t.state",
            "t.expiration_date",
            "t.id_house",
            "h.name as house_name",
            "t.id_user",
            "u.name as user_name",
            "u.image as user_image"
        )
        .leftJoin("Users as u", "t.id_user", "u.id_user")
        .join("Houses as h", "t.id_house", "h.id_house")
        .where({ "t.id_task": taskId });

    if (user.rol !== 'admin') {
        query = query.where(function() {
            this.whereIn('t.id_house', function() {
                this.select('id_house').from('HouseMembers').where('id_user', user.id);
            }).orWhere('t.id_user', user.id);
        });
    }

    const task = await query.first();

    if (!task) {
        throw { status: 404, message: "Task not found or unauthorized access" };
    }

    return task;
}

const createTask = async (taskData, user) => {
    // Verificar si el usuario tiene acceso a la casa
    if (user.rol !== 'admin') {
        const membership = await db("HouseMembers")
            .where({ id_house: taskData.id_house, id_user: user.id })
            .first();
        if (!membership) {
            throw { status: 403, message: "You don't have permission to create tasks in this house" };
        }
    }

    // Si se asigna un usuario a la tarea, verificar que pertenece a la casa
    if (taskData.id_user) {
        const targetUserMembership = await db("HouseMembers")
            .where({ id_house: taskData.id_house, id_user: taskData.id_user })
            .first();
        
        if (!targetUserMembership) {
            throw { status: 400, message: "The assigned user does not belong to this house" };
        }
    }

    // Sanitizar datos para insertar solo campos válidos
    const dataToInsert = {
        name: taskData.name,
        description: taskData.description || null,
        state: taskData.state || 'pending',
        expiration_date: (taskData.expiration_date && taskData.expiration_date.trim() !== "") ? taskData.expiration_date : null,
        id_house: taskData.id_house,
        id_user: (taskData.id_user && taskData.id_user !== "") ? taskData.id_user : null
    };

    const [id] = await db("Tasks").insert(dataToInsert);
    return id;
}

const updateTask = async (taskId, newTaskData, user) => {
    const existingTask = await findTaskById(taskId, user);
    
    if (!existingTask) {
        throw { status: 404, message: "Task not found" };
    }

    const updateData = {};
    if (newTaskData.name) updateData.name = newTaskData.name;
    if (newTaskData.description !== undefined) updateData.description = newTaskData.description;
    if (newTaskData.state) updateData.state = newTaskData.state;
    if (newTaskData.expiration_date !== undefined) updateData.expiration_date = newTaskData.expiration_date;
    if (newTaskData.id_house) updateData.id_house = newTaskData.id_house;
    if (newTaskData.id_user !== undefined) updateData.id_user = newTaskData.id_user;

    if (Object.keys(updateData).length > 0) {
        // Si se está cambiando el usuario o la casa, verificar que el usuario pertenece a la casa
        if (updateData.id_user || updateData.id_house) {
            const finalUserId = updateData.id_user !== undefined ? updateData.id_user : existingTask.id_user;
            const finalHouseId = updateData.id_house || existingTask.id_house;

            if (finalUserId) {
                const targetMembership = await db("HouseMembers")
                    .where({ id_house: finalHouseId, id_user: finalUserId })
                    .first();
                
                if (!targetMembership) {
                    throw { status: 400, message: "The assigned user does not belong to that house" };
                }
            }
        }

        await db("Tasks").where({ id_task: taskId }).update(updateData);
    }
}

const deleteTask = async (taskId, user) => {
    // Verificar existencia y acceso
    await findTaskById(taskId, user);
    
    await db("Tasks").where({ id_task: taskId }).del();
    return { message: "Task deleted successfully" };
}

const findTasksByHouse = async (houseId, user, filters = {}) => {
    // Verificar acceso a la casa
    if (user.rol !== 'admin') {
        const membership = await db("HouseMembers")
            .where({ id_house: houseId, id_user: user.id })
            .first();
        if (!membership) {
            throw { status: 403, message: "You don't have access to the tasks of this house" };
        }
    }

    let query = db("Tasks as t")
        .select(
            "t.id_task",
            "t.name",
            "t.description",
            "t.state",
            "t.expiration_date",
            "t.id_house",
            "t.id_user",
            "u.name as user_name",
            "u.image as user_image"
        )
        .leftJoin("Users as u", "t.id_user", "u.id_user")
        .where({ "t.id_house": houseId });
        
    if (filters.state) {
        query = query.where('t.state', filters.state);
    }
    if (filters.search) {
        query = query.where(function() {
            this.where('t.name', 'like', `%${filters.search}%`)
                .orWhere('t.description', 'like', `%${filters.search}%`);
        });
    }
    if (filters.sortBy) {
        const order = filters.order && filters.order.toLowerCase() === 'desc' ? 'desc' : 'asc';
        query = query.orderBy(`t.${filters.sortBy}`, order);
    }

    return await query;
}

const findTasksByUser = async (userId, user, filters = {}) => {
    let query = db("Tasks as t")
        .select(
            "t.id_task",
            "t.name",
            "t.description",
            "t.state",
            "t.expiration_date",
            "t.id_house",
            "h.name as house_name",
            "t.id_user",
            "u.name as user_name",
            "u.image as user_image"
        )
        .join("Houses as h", "t.id_house", "h.id_house")
        .leftJoin("Users as u", "t.id_user", "u.id_user")
        .where({ "t.id_user": userId });

    // Si no es admin y no es su propio perfil
    if (user.rol !== 'admin' && user.id !== parseInt(userId)) {
        // Solo puede ver las tareas del usuario en las casas que comparten
        query = query.whereIn('t.id_house', function() {
            this.select('id_house').from('HouseMembers').where('id_user', user.id);
        });

        // Verificamos primero si comparten casa para evitar fuga de información
        const sharedHouses = await db("HouseMembers")
            .whereIn('id_house', function() {
                this.select('id_house').from('HouseMembers').where('id_user', user.id);
            })
            .where('id_user', userId)
            .first();
        
        if (!sharedHouses) {
            throw { status: 403, message: "You don't have permission to view the tasks of this user" };
        }
    }

    if (filters.state) {
        query = query.where('t.state', filters.state);
    }
    if (filters.search) {
        query = query.where(function() {
            this.where('t.name', 'like', `%${filters.search}%`)
                .orWhere('t.description', 'like', `%${filters.search}%`);
        });
    }
    if (filters.sortBy) {
        const order = filters.order && filters.order.toLowerCase() === 'desc' ? 'desc' : 'asc';
        query = query.orderBy(`t.${filters.sortBy}`, order);
    }

    return await query;
}

module.exports = {
    findAllTasks,
    findTaskById,
    createTask,
    updateTask,
    deleteTask,
    findTasksByHouse,
    findTasksByUser,
}
