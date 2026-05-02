const {
  findUserById,
  findAllUsers,
  updateUser,
  deleteUser,
} = require("../services/userService");


/**
 * Obtiene todos los usuarios
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200 y los datos
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await findAllUsers();
    res.status(200).json({
      code: 200,
      title: "Success",
      message: `Usuarios obtenidos correctamente`,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Obtiene un usuario por su ID
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200 y los datos
 */
const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({
        code: 404,
        title: "Not Found",
        message: `Usuario con id ${userId} no encontrado`,
      });
    }
    res.status(200).json({
      code: 200,
      title: "Success",
      message: `Usuario con id ${userId} obtenido correctamente`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
