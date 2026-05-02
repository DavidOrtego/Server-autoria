const { body, param } = require("express-validator");


const userIdValidator = [
    param("userId")
        .isInt({ min: 1 })
        .withMessage("El ID del usuario debe ser un número entero positivo"),
];

const putUserValidator = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("El nombre no puede estar vacío.")
        .isLength({ max: 100 })
        .withMessage("El nombre no puede exceder los 100 caracteres."),

    body("email")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("El correo electrónico no puede estar vacío.")
        .isEmail()
        .withMessage("Debe ser un correo electrónico válido.")
        .isLength({ max: 150 })
        .withMessage("El correo electrónico no puede exceder los 150 caracteres."),

    body("password")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("La contraseña no puede estar vacía.")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres."),

    body("rol")
        .optional()
        .isIn(["admin", "member"])
        .withMessage("Rol inválido. Debe ser 'admin' o 'member'."),
       
    body("image")
        .optional()
        .trim()
        .isURL()
        .withMessage("La imagen debe ser una URL válida.")
];


module.exports = {
    userIdValidator,
    putUserValidator,
};
