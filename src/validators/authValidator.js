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
