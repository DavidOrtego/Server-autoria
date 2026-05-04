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
const findMembersByHouseId = async (houseId) => {
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
const findHousesByUserId = async (userId) => {
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
