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
        const tasks = await findAllTasks();
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
        const task = await findTaskById(taskId);
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

module.exports = {
    getAllTasks,
    getTaskById,
};
