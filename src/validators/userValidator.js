const { body, param } = require("express-validator");


const userIdValidator = [
    param("userId")
        .isInt({ min: 1 })
        .withMessage("El ID del usuario debe ser un número entero positivo"),
];

