const { body, param } = require("express-validator");

const expenseIdValidator = [
    param("expenseId")
        .isInt({ min: 1 })
        .withMessage("El ID del gasto debe ser un número entero positivo"),
];

const postExpenseValidator = [
    body("amount")
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage("El monto debe ser un número decimal válido.")
        .notEmpty()
        .withMessage("El monto es obligatorio."),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("La descripción es obligatoria.")
        .isLength({ max: 255 })
        .withMessage("La descripción no puede exceder los 255 caracteres."),

    body("date")
        .isISO8601()
        .withMessage("La fecha debe ser una fecha válida (ISO8601).")
        .notEmpty()
        .withMessage("La fecha es obligatoria."),

    body("id_user")
        .isInt({ min: 1 })
        .withMessage("El ID del usuario debe ser un número entero positivo.")
        .notEmpty()
        .withMessage("El ID del usuario es obligatorio."),

    body("id_house")
        .isInt({ min: 1 })
        .withMessage("El ID de la casa debe ser un número entero positivo.")
        .notEmpty()
        .withMessage("El ID de la casa es obligatorio."),
];

module.exports = {
    expenseIdValidator,
    postExpenseValidator,
};
