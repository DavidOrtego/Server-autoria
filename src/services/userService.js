const { db } = require("../config/database");
const { hashPassword } = require("../utils/encryption");


/**
 * Obtiene un usuario por su ID
 * @param {number} userId - ID del usuario a obtener
 * @returns {Promise<Object>} Objeto con el usuario
 */
const findUserById = async (userId) => {
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
const updateUser = async (userId, userData) => {
  await findUserById(userId); // Verifica si existe, tira 404 si no


  const updateData = {};
  if (userData.name) updateData.name = userData.name;
  if (userData.email) updateData.email = userData.email;
  if (userData.rol) updateData.rol = userData.rol;
  if (userData.image) updateData.image = userData.image;


  if (userData.password) {
    updateData.password = await hashPassword(userData.password);
  }


  if (Object.keys(updateData).length > 0) {
    await db("Users").where({ id_user: userId }).update(updateData);
  }


  return findUserById(userId);
};

/**
 * Elimina un usuario de la base de datos
 * @param {number} userId - ID del usuario a eliminar
 * @returns {Promise<Object>} Objeto con mensaje de confirmación
 */
const deleteUser = async (userId) => {
  await findUserById(userId); // Verifica si existe, tira 404 si no
  await db("Users").where({ id_user: userId }).del();
  return { message: "Usuario eliminado correctamente" };
};


module.exports = {
  findUserById,
  findAllUsers,
  updateUser,
  deleteUser,
};
