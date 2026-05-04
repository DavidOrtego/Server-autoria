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

module.exports = {
    findAllTasks,
    findTaskById,
    createTask,
}
