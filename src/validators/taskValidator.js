const { body, param } = require("express-validator");

const taskIdValidator = [
    param("taskId")
        .isInt({ min: 1 })
        .withMessage("El ID de la tarea debe ser un número entero positivo"),
];

const postTaskValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("El nombre de la tarea no puede estar vacío.")
        .isLength({ max: 100 })
        .withMessage("El nombre no puede exceder los 100 caracteres."),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage("La descripción no puede exceder los 255 caracteres."),

    body("state")
        .optional()
        .isIn(["pending", "in_progress", "completed"])
        .withMessage("Estado inválido. Debe ser 'pending', 'in_progress' o 'completed'."),

    body("expiration_date")
        .optional()
        .isISO8601()
        .withMessage("La fecha de expiración debe ser una fecha válida (ISO8601)."),

    body("id_house")
        .isInt({ min: 1 })
        .withMessage("El ID de la casa debe ser un número entero positivo."),

    body("id_user")
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage("El ID del usuario debe ser un número entero positivo."),
];

module.exports = {
    taskIdValidator,
    postTaskValidator,
};
