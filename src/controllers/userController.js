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
    const user = await findUserById(userId, req.user);
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

// El post de usuarios esta en el authController porque es un recurso publico

/**
 * Actualiza un usuario
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200 y los datos actualizados, o 404 si no se encuentra el usuario.
 */
const putUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    await updateUser(userId, userData, req.user);
    const updatedUser = await findUserById(userId, req.user);
    if (!updatedUser) {
      return res.status(404).json({
        code: 404,
        title: "Not Found",
        message: `Usuario con id ${userId} no encontrado`,
      });
    }
    res.status(200).json({
      code: 200,
      title: "Success",
      message: `Usuario con id ${userId} actualizado correctamente`,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Elimina un usuario
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200 si el usuario ha sido eliminado, o 404 si no encuentra el usuario
 */
const deleteAUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const deletedUser = await deleteUser(userId, req.user);
    if (deletedUser === 0) {
      return res.status(404).json({
        code: 404,
        title: "Not Found",
        message: `Usuario con id ${userId} no encontrado`,
      });
    }
    res.status(200).json({
      code: 200,
      title: "Success",
      message: `Usuario con id ${userId} eliminado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllUsers,
  getUserById,
  putUser,
  deleteAUser,
};
