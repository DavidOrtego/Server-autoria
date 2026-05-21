const { body, param } = require("express-validator");


const userIdValidator = [
    param("userId")
        .isInt({ min: 1 })
        .withMessage("User ID must be a positive integer"),
];

const putUserValidator = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Name cannot be empty.")
        .isLength({ max: 100 })
        .withMessage("Name cannot exceed 100 characters."),

    body("email")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Email cannot be empty.")
        .isEmail()
        .withMessage("Must be a valid email.")
        .isLength({ max: 150 })
        .withMessage("Email cannot exceed 150 characters."),

    body("password")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Password cannot be empty.")
        .isLength({ min: 8 })
        .withMessage("Password must have at least 8 characters."),

    body("rol")
        .optional()
        .isIn(["admin", "member"])
        .withMessage("Invalid role. Must be 'admin' or 'member'."),
       
    body("image")
        .optional()
        .trim()
        .isURL()
        .withMessage("Image must be a valid URL.")
];


module.exports = {
    userIdValidator,
    putUserValidator,
};
