const {
    findAllTasks,
    findTaskById,
    createTask,
    updateTask,
    deleteTask,
    findTasksByHouse,
    findTasksByUser,
} = require("../services/taskService");

/**
 * Obtiene todas las tareas
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200 y los datos
 */
const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await findAllTasks(req.user);
        res.status(200).json({
            code: 200,
            title: "Success",
            message: "Tareas obtenidas correctamente",
            data: tasks,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Obtiene una tarea por su ID
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200 y los datos
 */
const getTaskById = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const task = await findTaskById(taskId, req.user);
        res.status(200).json({
            code: 200,
            title: "Success",
            message: `Tarea con id ${taskId} obtenida correctamente`,
            data: task,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Crea una nueva tarea
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 201 y la tarea creada
 */
const postTask = async (req, res, next) => {
    try {
        const taskData = req.body;
        const newId = await createTask(taskData, req.user);
        const newTask = {
            id_task: newId,
            ...taskData,
        };

        res.status(201).json({
            code: 201,
            title: "Created",
            message: `Tarea con id ${newId} creada correctamente`,
            data: newTask,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Actualiza una tarea existente
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200 y los datos actualizados
 */
const putTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const taskData = req.body;
        await updateTask(taskId, taskData, req.user);
        const updatedTask = await findTaskById(taskId, req.user);

        res.status(200).json({
            code: 200,
            title: "Success",
            message: `Tarea con id ${taskId} actualizada correctamente`,
            data: updatedTask,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Elimina una tarea
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200
 */
const deleteATask = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        await deleteTask(taskId, req.user);
        res.status(200).json({
            code: 200,
            title: "Success",
            message: `Tarea con id ${taskId} eliminada correctamente`,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Obtiene las tareas de una casa específica
 */
const getTasksByHouse = async (req, res, next) => {
    try {
        const { houseId } = req.params;
        const tasks = await findTasksByHouse(houseId, req.user);
        res.status(200).json({
            code: 200,
            title: "Success",
            message: `Tareas de la casa ${houseId} obtenidas correctamente`,
            data: tasks,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Obtiene las tareas de un usuario específico
 */
const getTasksByUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const tasks = await findTasksByUser(userId, req.user);
        res.status(200).json({
            code: 200,
            title: "Success",
            message: `Tareas del usuario ${userId} obtenidas correctamente`,
            data: tasks,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    postTask,
    putTask,
    deleteATask,
    getTasksByHouse,
    getTasksByUser,
};
