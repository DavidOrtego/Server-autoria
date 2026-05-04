const express = require("express");
const router = express.Router();

// Controlador
const houseMemberController = require("../controllers/houseMemberController");

// Validadores y manejador de errores
const { handleValidationErrors } = require("../middlewares/errorHandler");
const { 
    idHouseParamValidator, 
    idUserParamValidator, 
    postHouseMemberValidator 
} = require("../validators/houseMemberValidator");

// Seguridad
const { authenticateToken } = require("../middlewares/authMiddleware");

// Todas las rutas de miembros requieren estar logueado
router.use(authenticateToken);

// Obtener miembros de una casa específica
// GET /api/house-members/house/:id_house
router.get(
    "/house/:id_house",
    idHouseParamValidator,
    handleValidationErrors,
    houseMemberController.getMembersByHouseId
);

// Obtener las casas de un usuario específico
// GET /api/house-members/user/:id_user
router.get(
    "/user/:id_user",
    idUserParamValidator,
    handleValidationErrors,
    houseMemberController.getHousesByUserId
);
