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


