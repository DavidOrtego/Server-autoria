const { body, param } = require("express-validator");

const expenseIdValidator = [
    param("expenseId")
        .isInt({ min: 1 })
        .withMessage("Expense ID must be a positive integer"),
];

const postExpenseValidator = [
    body("amount")
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage("Amount must be a valid decimal number.")
        .notEmpty()
        .withMessage("Amount is required."),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required.")
        .isLength({ max: 255 })
        .withMessage("Description cannot exceed 255 characters."),

    body("date")
        .isISO8601()
        .withMessage("Date must be a valid date (ISO8601).")
        .notEmpty()
        .withMessage("Date is required."),

    body("id_user")
        .isInt({ min: 1 })
        .withMessage("User ID must be a positive integer.")
        .notEmpty()
        .withMessage("User ID is required."),

    body("id_house")
        .isInt({ min: 1 })
        .withMessage("House ID must be a positive integer.")
        .notEmpty()
        .withMessage("House ID is required."),
];

const putExpenseValidator = [
    body("amount")
        .optional()
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage("Amount must be a valid decimal number."),

    body("description")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Description cannot be empty.")
        .isLength({ max: 255 })
        .withMessage("Description cannot exceed 255 characters."),

    body("date")
        .optional()
        .isISO8601()
        .withMessage("Date must be a valid date (ISO8601)."),

    body("id_user")
        .optional()
        .isInt({ min: 1 })
        .withMessage("User ID must be a positive integer."),

    body("id_house")
        .optional()
        .isInt({ min: 1 })
        .withMessage("House ID must be a positive integer."),
];

module.exports = {
    expenseIdValidator,
    postExpenseValidator,
    putExpenseValidator,
};
