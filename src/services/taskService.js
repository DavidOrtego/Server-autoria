const { db } = require("../config/database");

const findAllTasks = async () => {
    const tasks = await db("Tasks").select(
        "id_task",
        "name",
        "description",
        "state",
        "expiration_date",
        "id_house",
        "id_user"
    );
    return tasks;
}

const findTaskById = async (taskId) => {
    const task = await db("Tasks")
        .select(
            "id_task",
            "name",
            "description",
            "state",
            "expiration_date",
            "id_house",
            "id_user"
        )
        .where({ id_task: taskId })
        .first();

    if (!task) {
        throw { status: 404, message: "Tarea no encontrada" };
    }

    return task;
}

const createTask = async (taskData) => {
    const [id] = await db("Tasks").insert(taskData);
    return id;
}

const updateTask = async (taskId, newTaskData) => {
    const existingTask = await db("Tasks")
        .where({ id_task: taskId })
        .first();
    
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

const deleteTask = async (taskId) => {
    const existingTask = await db("Tasks")
        .where({ id_task: taskId })
        .first();
    
    if (!existingTask) {
        throw { status: 404, message: "Tarea no encontrada" };
    }
    
    await db("Tasks").where({ id_task: taskId }).del();
    return { message: "Tarea eliminada correctamente" };
}

module.exports = {
    findAllTasks,
    findTaskById,
    createTask,
    updateTask,
    deleteTask,
}
