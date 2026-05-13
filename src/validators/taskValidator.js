const { body, param } = require("express-validator");

const taskIdValidator = [
    param("taskId")
        .isInt({ min: 1 })
        .withMessage("Task ID must be a positive integer"),
];

const postTaskValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Task name cannot be empty.")
        .isLength({ max: 100 })
        .withMessage("Name cannot exceed 100 characters."),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage("Description cannot exceed 255 characters."),

    body("state")
        .optional()
        .isIn(["pending", "complete"])
        .withMessage("Invalid state. Must be 'pending' or 'complete'."),

    body("expiration_date")
        .optional()
        .isISO8601()
        .withMessage("Expiration date must be a valid date (ISO8601)."),

    body("id_house")
        .isInt({ min: 1 })
        .withMessage("House ID must be a positive integer."),

    body("id_user")
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage("User ID must be a positive integer."),
];

const putTaskValidator = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Task name cannot be empty.")
        .isLength({ max: 100 })
        .withMessage("Name cannot exceed 100 characters."),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage("Description cannot exceed 255 characters."),

    body("state")
        .optional()
        .isIn(["pending", "complete"])
        .withMessage("Invalid state. Must be 'pending' or 'complete'."),

    body("expiration_date")
        .optional()
        .isISO8601()
        .withMessage("Expiration date must be a valid date (ISO8601)."),

    body("id_house")
        .optional()
        .isInt({ min: 1 })
        .withMessage("House ID must be a positive integer."),

    body("id_user")
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage("User ID must be a positive integer."),
];

module.exports = {
    taskIdValidator,
    postTaskValidator,
    putTaskValidator,
};
