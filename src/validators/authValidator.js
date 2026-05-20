const {body, param } = require("express-validator");


const registerValidators = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required.")
        .isLength({ max: 100 })
        .withMessage("Name cannot exceed 100 characters."),


    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Must be a valid email.")
        .isLength({ max: 150 })
        .withMessage("Email cannot exceed 150 characters."),


    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({ min: 8 })
        .withMessage("Password must have at least 8 characters."),


    body("rol")
        .optional()
        .isIn(["admin", "member"])
        .withMessage("Invalid role"),
];

const loginValidators = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Must be a valid email.")
        .isLength({ max: 150 })
        .withMessage("Email cannot exceed 150 characters."),


    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({ min: 8 })
        .withMessage("Password must have at least 8 characters."),
];

module.exports = {
    registerValidators,
    loginValidators,
};
