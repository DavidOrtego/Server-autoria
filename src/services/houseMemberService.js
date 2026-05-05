const { db } = require("../config/database");

/**
 * Busca a todos los miembros de una casa
 * @returns {Promise<Object>} Objeto con todos los miembros
 */
const findAllHouseMembers = async () => {
    const members = await db("HouseMembers").select("*");
    return members;
};

/**
 * Busca a los miembros de una casa por su ID
 * @param {number} houseId - ID de la casa
 * @returns {Promise<Object>} Objeto con los miembros
 */
const findMembersByHouseId = async (houseId, user) => {
    // Verificar si el usuario tiene acceso a la casa
    if (user.rol !== 'admin') {
        const membership = await db("HouseMembers")
            .where({ id_house: houseId, id_user: user.id })
            .first();
        if (!membership) {
            throw { status: 403, message: "No tienes permiso para ver los miembros de esta casa" };
        }
    }

    const members = await db("HouseMembers")
        .join("Users", "HouseMembers.id_user", "=", "Users.id_user")
        .select(
            "Users.id_user",
            "Users.name",
            "Users.email",
            "Users.rol",
            "Users.image",
            "HouseMembers.id_membership",
            "HouseMembers.join_date"
        )
        .where("HouseMembers.id_house", houseId);
    
    return members;
};

/**
 * Busca las casas a las que pertenece un usuario por su ID
 * @param {number} userId - ID del usuario
 * @returns {Promise<Object>} Objeto con las casas
 */
const findHousesByUserId = async (userId, user) => {
    // Solo el propio usuario o el admin pueden ver en qué casas está metido
    if (user.rol !== 'admin' && parseInt(user.id) !== parseInt(userId)) {
        throw { status: 403, message: "No tienes permiso para ver esta información" };
    }

    const houses = await db("HouseMembers")
        .join("Houses", "HouseMembers.id_house", "=", "Houses.id_house")
        .select(
            "Houses.id_house",
            "Houses.name",
            "Houses.address",
            "Houses.number_of_rooms",
            "Houses.image",
            "Houses.level",
            "HouseMembers.id_membership",
            "HouseMembers.join_date"
        )
        .where("HouseMembers.id_user", userId);
    
    return houses;
};

/**
 * Añade un usuario a una casa
 * @param {number} houseId - ID de la casa
 * @param {number} userId - ID del usuario
 * @returns {Promise<Object>} Objeto con el ID de la membresía
 */
const addMemberToHouse = async (houseId, userId, user) => {
    // Solo un miembro actual de la casa o un admin pueden invitar a otros
    if (user.rol !== 'admin') {
        const membership = await db("HouseMembers")
            .where({ id_house: houseId, id_user: user.id })
            .first();
        if (!membership) {
            throw { status: 403, message: "Solo los miembros de la casa pueden añadir a otros" };
        }
    }

    // Verificar si ya es miembro para evitar duplicados
    const existing = await db("HouseMembers")
        .where({ id_house: houseId, id_user: userId })
        .first();
    
    if (existing) {
        throw { status: 400, message: "El usuario ya es miembro de esta casa" };
    }

    const [id] = await db("HouseMembers").insert({
        id_house: houseId,
        id_user: userId
    });
    
    return id;
};
/**
 * Elimina un usuario de una casa
 * @param {number} houseId - ID de la casa
 * @param {number} userId - ID del usuario
 * @returns {Promise<Object>} Objeto con el número de registros eliminados
 */
const removeMemberFromHouse = async (houseId, userId, user) => {
    // Solo un miembro de la casa o admin puede eliminar miembros
    // (O el propio usuario si quiere irse de la casa)
    if (user.rol !== 'admin' && parseInt(user.id) !== parseInt(userId)) {
        const membership = await db("HouseMembers")
            .where({ id_house: houseId, id_user: user.id })
            .first();
        if (!membership) {
            throw { status: 403, message: "No tienes permiso para eliminar miembros de esta casa" };
        }
    }

    const deletedCount = await db("HouseMembers")
        .where({ id_house: houseId, id_user: userId })
        .del();
    
    if (deletedCount === 0) {
        throw { status: 404, message: "No se encontró el miembro en la casa" };
    }
    
    return deletedCount;
};

module.exports = {
    findAllHouseMembers,
    findMembersByHouseId,
    findHousesByUserId,
    addMemberToHouse,
    removeMemberFromHouse
};
