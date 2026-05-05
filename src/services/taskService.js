const { db } = require("../config/database");

const findAllTasks = async (user) => {
    let query = db("Tasks").select(
        "id_task",
        "name",
        "description",
        "state",
        "expiration_date",
        "id_house",
        "id_user"
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

const findTaskById = async (taskId, user) => {
    let query = db("Tasks")
        .select(
            "id_task",
            "name",
            "description",
            "state",
            "expiration_date",
            "id_house",
            "id_user"
        )
        .where({ id_task: taskId });

    if (user.rol !== 'admin') {
        query = query.where(function() {
            this.whereIn('id_house', function() {
                this.select('id_house').from('HouseMembers').where('id_user', user.id);
            }).orWhere('id_user', user.id);
        });
    }

    const task = await query.first();

    if (!task) {
        throw { status: 404, message: "Tarea no encontrada o sin acceso" };
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
            throw { status: 403, message: "No tienes permiso para crear tareas en esta casa" };
        }
    }

    const [id] = await db("Tasks").insert(taskData);
    return id;
}

const updateTask = async (taskId, newTaskData, user) => {
    const existingTask = await findTaskById(taskId, user);
    
    if (!existingTask) {
        throw { status: 404, message: "Tarea no encontrada" };
    }

    const updateData = {};
    if (newTaskData.name) updateData.name = newTaskData.name;
    if (newTaskData.description !== undefined) updateData.description = newTaskData.description;
    if (newTaskData.state) updateData.state = newTaskData.state;
    if (newTaskData.expiration_date !== undefined) updateData.expiration_date = newTaskData.expiration_date;
    if (newTaskData.id_house) updateData.id_house = newTaskData.id_house;
    if (newTaskData.id_user !== undefined) updateData.id_user = newTaskData.id_user;

    if (Object.keys(updateData).length > 0) {
        await db("Tasks").where({ id_task: taskId }).update(updateData);
    }
}

const deleteTask = async (taskId, user) => {
    await findTaskById(taskId, user);
    
    if (!existingTask) {
        throw { status: 404, message: "Tarea no encontrada" };
    }
    
    await db("Tasks").where({ id_task: taskId }).del();
    return { message: "Tarea eliminada correctamente" };
}

const findTasksByHouse = async (houseId, user) => {
    // Verificar acceso a la casa
    if (user.rol !== 'admin') {
        const membership = await db("HouseMembers")
            .where({ id_house: houseId, id_user: user.id })
            .first();
        if (!membership) {
            throw { status: 403, message: "No tienes acceso a las tareas de esta casa" };
        }
    }

    const tasks = await db("Tasks")
        .select(
            "id_task",
            "name",
            "description",
            "state",
            "expiration_date",
            "id_house",
            "id_user"
        )
        .where({ id_house: houseId });
    return tasks;
}

const findTasksByUser = async (userId, user) => {
    // Un usuario solo puede ver sus tareas asignadas, a menos que sea admin
    // O que el que consulta sea miembro de la misma casa
    if (user.rol !== 'admin' && user.id !== parseInt(userId)) {
        // Vamos a permitirlo si comparten al menos una casa.
        const sharedHouses = await db("HouseMembers")
            .whereIn('id_house', function() {
                this.select('id_house').from('HouseMembers').where('id_user', user.id);
            })
            .where('id_user', userId)
            .first();
        
        if (!sharedHouses) {
            throw { status: 403, message: "No tienes permiso para ver las tareas de este usuario" };
        }
    }

    const tasks = await db("Tasks")
        .select(
            "id_task",
            "name",
            "description",
            "state",
            "expiration_date",
            "id_house",
            "id_user"
        )
        .where({ id_user: userId });
    return tasks;
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
