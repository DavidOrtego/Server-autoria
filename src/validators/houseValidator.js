const { body, param } = require("express-validator");

/**
 * Validadores para la creación de una casa
 */
const createHouseValidators = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("The house name is required")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters"),

  body("address")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("Address cannot exceed 255 characters"),

  body("number_of_rooms")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Number of rooms must be an integer greater than 0"),

  body("image")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("Image URL cannot exceed 255 characters"),
];

/**
 * Validadores para la actualización de una casa
 */
const updateHouseValidators = [
  param("houseId")
    .isInt()
    .withMessage("House ID must be a valid number"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("House name cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters"),

  body("address")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("Address cannot exceed 255 characters"),

  body("number_of_rooms")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Number of rooms must be an integer greater than 0"),

  body("image")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("Image URL cannot exceed 255 characters"),

];

/**
 * Validador para el ID de la casa en los parámetros
 */
const houseIdParamValidator = [
  param("houseId")
    .isInt()
    .withMessage("House ID must be a valid number"),
];

module.exports = {
  createHouseValidators,
  updateHouseValidators,
  houseIdParamValidator,
};
