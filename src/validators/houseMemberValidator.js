const { param, body } = require("express-validator");

// Validar el ID de la casa
const idHouseParamValidator = [
    param("id_house")
        .exists().withMessage("House ID is required")
        .isInt({ min: 1 }).withMessage("House ID must be a positive integer"),
];

// Validar el ID del usuario
const idUserParamValidator = [
    param("id_user")
        .exists().withMessage("User ID is required")
        .isInt({ min: 1 }).withMessage("User ID must be a positive integer"),
];

// Validar al crear un miembro
const postHouseMemberValidator = [
    body("id_house")
        .exists().withMessage("House ID is required")
        .isInt({ min: 1 }).withMessage("House ID must be a positive integer"),
    body("email")
        .exists().withMessage("Email is required")
        .trim()
        .isEmail().withMessage("Must be a valid email"),
];

module.exports = {
    idHouseParamValidator,
    idUserParamValidator,
    postHouseMemberValidator,
};
