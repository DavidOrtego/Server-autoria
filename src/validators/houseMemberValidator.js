const { param, body } = require("express-validator");

// Validar el ID de la casa
const idHouseParamValidator = [
    param("id_house")
        .exists().withMessage("El ID de la casa es obligatorio")
        .isInt({ min: 1 }).withMessage("El ID de la casa debe ser un número entero positivo"),
];

// Validar el ID del usuario
const idUserParamValidator = [
    param("id_user")
        .exists().withMessage("El ID del usuario es obligatorio")
        .isInt({ min: 1 }).withMessage("El ID del usuario debe ser un número entero positivo"),
];

// Validar al crear un miembro
const postHouseMemberValidator = [
    body("id_house")
        .exists().withMessage("El ID de la casa es obligatorio")
        .isInt({ min: 1 }).withMessage("El ID de la casa debe ser un número entero positivo"),
    body("email")
        .exists().withMessage("El email es obligatorio")
        .trim()
        .isEmail().withMessage("Debe ser un email válido"),
];

module.exports = {
    idHouseParamValidator,
    idUserParamValidator,
    postHouseMemberValidator,
};
