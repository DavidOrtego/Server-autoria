const {body, param } = require("express-validator");
const { confirmPassword } = require("../utils/confirmPassword.js");


const registerValidators = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("El nombre es requerido.")
        .isLength({ max: 100 })
        .withMessage("El nombre no puede exceder los 100 caracteres."),


    body("email")
        .trim()
        .notEmpty()
        .withMessage("El correo electrónico es requerido.")
        .isEmail()
        .withMessage("Debe ser un correo electrónico válido.")
        .isLength({ max: 150 })
        .withMessage("El correo electrónico no puede exceder los 150 caracteres."),


    body("password")
        .trim()
        .notEmpty()
        .withMessage("La contraseña es requerida.")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres."),


    body("rol")
        .optional()
        .isIn(["admin", "member"])
        .withMessage("Rol inválido"),
];

const loginValidators = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("El correo electrónico es requerido.")
        .isEmail()
        .withMessage("Debe ser un correo electrónico válido.")
        .isLength({ max: 150 })
        .withMessage("El correo electrónico no puede exceder los 150 caracteres."),


    body("password")
        .trim()
        .notEmpty()
        .withMessage("La contraseña es requerida.")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres."),
];

const refreshTokenValidators = [
    body("refreshToken")
        .trim()
        .notEmpty()
        .withMessage("El refresh token es requerido.")
        .isJWT()
        .withMessage("El refresh token debe ser un token JWT válido.")
];

const changePasswordValidators = [
    body("oldPassword")
        .trim()
        .notEmpty()
        .withMessage("La contraseña anterior es requerida.")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres."),


    body("newPassword")
        .trim()
        .notEmpty()
        .withMessage("La nueva contraseña es requerida.")
        .isLength({ min: 8 })
        .withMessage("La nueva contraseña debe tener al menos 8 caracteres."),


    body("confirmPassword")
        .trim()
        .notEmpty()
        .withMessage("La confirmación de la contraseña es requerida.")
        .custom((value, { req }) => confirmPassword(value, req.body.newPassword)),
];


const forgotPasswordValidators = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("El correo electrónico es requerido.")
        .isEmail()
        .withMessage("Debe ser un correo electrónico válido.")
        .isLength({ max: 150 })
        .withMessage("El correo electrónico no puede exceder los 150 caracteres."),
];


module.exports = {
    registerValidators,
    loginValidators,
    refreshTokenValidators,
    changePasswordValidators,
    forgotPasswordValidators,
};
