const {
    findMembersByHouseId,
    findHousesByUserId,
    addMemberToHouse,
    removeMemberFromHouse
} = require("../services/houseMemberService");

/**
 * Obtiene los miembros de una casa
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200 y los datos si es correcto, 404 si no se encuentra la casa.
 */
const getMembersByHouseId = async (req, res, next) => {
    try {
        const { id_house } = req.params;
        const members = await findMembersByHouseId(id_house, req.user);
        if (!members) {
            return res.status(404).json({
                code: 404,
                title: "Not Found",
                message: `No members found for house with id ${id_house}`,
            });
        }
        res.status(200).json({
            code: 200,
            title: "Success",
            message: `Members of house with id ${id_house} retrieved successfully`,
            data: members,
        });
    } catch (error) {
        next(error);
    }
}
/**
 * Obtiene las casas a las que pertenece un usuario
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200 y los datos si es correcto, 404 si no se encuentra el usuario.
 */
const getHousesByUserId = async (req, res, next) => {
    try {
        const { id_user } = req.params;
        const houses = await findHousesByUserId(id_user, req.user);
        if (!houses) {
            return res.status(404).json({
                code: 404,
                title: "Not Found",
                message: `No houses found for user with id ${id_user}`,
            });
        }
        res.status(200).json({
            code: 200,
            title: "Success",
            message: `Houses for user with id ${id_user} retrieved successfully`,
            data: houses,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Agrega un nuevo usuario a una casa
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200 y los datos si es correcto, 404 si no se encuentra el usuario o la casa.
 */
const postHouseMember = async (req, res, next) => {
    try {
        const { id_house, email } = req.body;
        const houseMember = await addMemberToHouse(id_house, email, req.user);
        if (!houseMember) {
            return res.status(404).json({
                code: 404,
                title: "Not Found",
                message: `Could not add user to the house`,
            });
        }
        res.status(200).json({
            code: 200,
            title: "Success",
            message: `User added to the house successfully`,
            data: houseMember,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Elimina un usuario de una casa
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200 y los datos si es correcto, 404 si no se encuentra el usuario o la casa.
 */
const deleteHouseMember = async (req, res, next) => {
    try {
        const { id_house, id_user } = req.params;
        const houseMember = await removeMemberFromHouse(id_house, id_user, req.user);
        if (!houseMember) {
            return res.status(404).json({
                code: 404,
                title: "Not Found",
                message: `Could not remove user from the house`,
            });
        }
        res.status(200).json({
            code: 200,
            title: "Success",
            message: `User with id ${id_user} removed from house with id ${id_house} successfully`,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getMembersByHouseId,
    getHousesByUserId,
    postHouseMember,
    deleteHouseMember,
};