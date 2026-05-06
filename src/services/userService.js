const { db } = require("../config/database");
const { hashPassword } = require("../utils/encryption");


/**
 * Obtiene un usuario por su ID
 * @param {number} userId - ID del usuario a obtener
 * @returns {Promise<Object>} Objeto con el usuario
 */
const findUserById = async (userId, requester) => {
  // Solo admin o el propio usuario pueden ver los detalles
  if (requester.rol !== 'admin' && parseInt(requester.id) !== parseInt(userId)) {
      throw { status: 403, message: "No tienes permiso para acceder a esta información" };
  }

  const user = await db("Users")
    .select("id_user", "name", "email", "rol", "image")
    .where({ id_user: userId })
    .first();


  if (!user) {
    throw { status: 404, message: "Usuario no encontrado" };
  }
  return user;
};

/**
 * Obtiene todos los usuarios de la base de datos
 * @returns {Promise<Object>} Objeto con todos los usuarios
 */
const findAllUsers = async () => {
  return db("Users").select("id_user", "name", "email", "rol", "image");
};

/**
 * Actualiza los datos de un usuario
 * @param {number} userId - ID del usuario a actualizar
 * @param {Object} userData - Datos del usuario a actualizar
 * @returns {Promise<Object>} Objeto con el usuario actualizado
 */
const updateUser = async (userId, userData, requester) => {
  // Verifica si existe y si el requester tiene permiso
  await findUserById(userId, requester); 


  const updateData = {};
  if (userData.name) updateData.name = userData.name;
  if (userData.email) updateData.email = userData.email;
  if (userData.rol && requester.rol === 'admin') updateData.rol = userData.rol; // Solo admin cambia roles
  if (userData.image) updateData.image = userData.image;


  if (userData.password) {
    updateData.password = await hashPassword(userData.password);
  }


  if (Object.keys(updateData).length > 0) {
    await db("Users").where({ id_user: userId }).update(updateData);
  }


  return findUserById(userId, requester);
};

/**
 * Elimina un usuario de la base de datos
 * @param {number} userId - ID del usuario a eliminar
 * @returns {Promise<Object>} Objeto con mensaje de confirmación
 */
const deleteUser = async (userId, requester) => {
  await findUserById(userId, requester); // Verifica si existe y permiso
  //Funciones de integridad de borrado
  //Comprobar si hay tareas asignadas a este usuario
  const tasksCount = await db("Tasks").where({ id_user: userId }).count('* as total').first();

  await db("Users").where({ id_user: userId }).del();
  return { message: "Usuario eliminado correctamente" };
};


module.exports = {
  findUserById,
  findAllUsers,
  updateUser,
  deleteUser,
};
