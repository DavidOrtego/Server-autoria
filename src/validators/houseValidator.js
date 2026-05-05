const { body, param } = require("express-validator");

/**
 * Validadores para la creación de una casa
 */
const createHouseValidators = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la casa es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El nombre no puede exceder los 100 caracteres"),

  body("address")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("La dirección no puede exceder los 255 caracteres"),

  body("number_of_rooms")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El número de habitaciones debe ser un número entero mayor a 0"),

  body("image")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("La URL de la imagen no puede exceder los 255 caracteres"),
];

/**
 * Validadores para la actualización de una casa
 */
const updateHouseValidators = [
  param("houseId")
    .isInt()
    .withMessage("El ID de la casa debe ser un número válido"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre de la casa no puede estar vacío")
    .isLength({ max: 100 })
    .withMessage("El nombre no puede exceder los 100 caracteres"),

  body("address")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("La dirección no puede exceder los 255 caracteres"),

  body("number_of_rooms")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El número de habitaciones debe ser un número entero mayor a 0"),

  body("image")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("La URL de la imagen no puede exceder los 255 caracteres"),

];

/**
 * Validador para el ID de la casa en los parámetros
 */
const houseIdParamValidator = [
  param("houseId")
    .isInt()
    .withMessage("El ID de la casa debe ser un número válido"),
];

module.exports = {
  createHouseValidators,
  updateHouseValidators,
  houseIdParamValidator,
};
