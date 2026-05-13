const {
  findAllHouses,
  findHouseById,
  createHouse,
  updateHouse,
  deleteHouse,
} = require("../services/houseService");

/**
 * Obtiene todas las casas
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200 y los datos
 */
const getAllHouses = async (req, res, next) => {
  try {
    const houses = await findAllHouses(req.user);
    res.status(200).json({
      code: 200,
      title: "Success",
      message: `Houses retrieved successfully`,
      data: houses,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Obtiene una casa por su ID
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 404 si no encuentra y 200 si la encuentra y le devuelve los datos
 */
const getHouseById = async (req, res, next) => {
  try {
    const { houseId } = req.params;
    const house = await findHouseById(houseId, req.user);
    if (!house) {
      res.status(404).json({
        code: 404,
        title: "Not Found",
        message: `House with id ${houseId} not found`,
      });
    }
    res.status(200).json({
      code: 200,
      title: "Success",
      message: `House with id ${houseId} retrieved successfully`,
      data: house,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Crea una casa
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200 y los datos
 */
const postHouse = async (req, res, next) => {
  try {
    const houseData = req.body;
    const newId = await createHouse(houseData, req.user.id);
    const newHouse = {
      id_house: newId,
      ...houseData,
    };

    res.status(201).json({
      code: 201,
      title: "Created",
      message: `House with id ${newId} created successfully`,
      data: newHouse,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualiza una casa
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200 y los datos actualizados
 */
const putHouse = async (req, res, next) => {
  try {
    const { houseId } = req.params;
    const houseData = req.body;
    await updateHouse(houseId, houseData, req.user);
    const updatedHouse = await findHouseById(houseId, req.user);
    if (!updatedHouse) {
      res.status(404).json({
        code: 404,
        title: "Not Found",
        message: `House with id ${houseId} not found`,
      });
    }

    res.status(200).json({
      code: 200,
      title: "Success",
      message: `House with id ${houseId} updated successfully`,
      data: updatedHouse,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Elimina una casa
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>} Devuelve una respuesta JSON con código 200 si la casa ha sido eliminada, o 404 si no encuentra la casa
 */
const deleteAHouse = async (req, res, next) => {
  try {
    const { houseId } = req.params;
    const deletedHouse = await deleteHouse(houseId, req.user);
    if (deletedHouse === 0) {
      res.status(404).json({
        code: 404,
        title: "Not Found",
        message: `House with id ${houseId} not found`,
      });
    }
    res.status(200).json({
      code: 200,
      title: "Success",
      message: `House with id ${houseId} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllHouses,
  getHouseById,
  postHouse,
  putHouse,
  deleteAHouse,
};
