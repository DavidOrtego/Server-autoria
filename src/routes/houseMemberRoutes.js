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

// Añadir un miembro a una casa
// POST /api/house-members
router.post(
    "/",
    postHouseMemberValidator,
    handleValidationErrors,
    houseMemberController.postHouseMember
);

// Eliminar un miembro de una casa
// DELETE /api/house-members/house/:id_house/user/:id_user
router.delete(
    "/house/:id_house/user/:id_user",
    idHouseParamValidator,
    idUserParamValidator,
    handleValidationErrors,
    houseMemberController.deleteHouseMember
);

module.exports = router;

