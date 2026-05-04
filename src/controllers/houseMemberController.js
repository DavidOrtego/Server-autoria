const {
    findAllHouseMembers,
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
        const members = await findMembersByHouseId(id_house);
        if (!members) {
            return res.status(404).json({
                code: 404,
                title: "Not Found",
                message: `No se encontraron miembros para la casa con id ${id_house}`,
            });
        }
        res.status(200).json({
            code: 200,
            title: "Success",
            message: `Miembros de la casa con id ${id_house} obtenidos correctamente`,
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
        const houses = await findHousesByUserId(id_user);
        if (!houses) {
            return res.status(404).json({
                code: 404,
                title: "Not Found",
                message: `No se encontraron casas para el usuario con id ${id_user}`,
            });
        }
        res.status(200).json({
            code: 200,
            title: "Success",
            message: `Casas del usuario con id ${id_user} obtenidos correctamente`,
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
        const { id_house, id_user } = req.body;
        const houseMember = await addMemberToHouse(id_house, id_user);
        if (!houseMember) {
            return res.status(404).json({
                code: 404,
                title: "Not Found",
                message: `No se pudo agregar el usuario a la casa`,
            });
        }
        res.status(200).json({
            code: 200,
            title: "Success",
            message: `Usuario agregado a la casa correctamente`,
            data: houseMember,
        });
    } catch (error) {
        next(error);
    }
}

