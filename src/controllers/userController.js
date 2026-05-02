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
