const express = require("express");
const router = express.Router();

// Importamos el controlador de houses
const houseController = require("../controllers/houseController");

// Importamos los middlewares de seguridad
const { authenticateToken, isAdmin } = require("../middlewares/authMiddleware");

// Importamos los validadores
const {
  createHouseValidators,
  updateHouseValidators,
  houseIdParamValidator,
} = require("../validators/houseValidator");

// Importar el middleware que maneja los errores de express-validator
const { handleValidationErrors } = require("../middlewares/errorHandler");

// Verificar que hay un usuario logueado y guardar los datos en req.user
router.use(authenticateToken);

// RUTAS DE HOUSES

// GET /houses -> Obtiene todas las casas
router.get("/", houseController.getAllHouses);

// GET /houses/:houseId -> Obtiene la información de una casa específica
router.get(
  "/:houseId",
  houseIdParamValidator,
  handleValidationErrors,
  houseController.getHouseById
);

// POST /houses -> Crea una nueva casa
router.post(
  "/",
  createHouseValidators,
  handleValidationErrors,
  houseController.postHouse
);

// PUT /houses/:houseId -> Actualiza la información de una casa
router.put(
  "/:houseId",
  updateHouseValidators,
  handleValidationErrors,
  houseController.putHouse
);

// DELETE /houses/:houseId -> Elimina una casa
router.delete(
  "/:houseId",
  isAdmin,
  houseIdParamValidator,
  handleValidationErrors,
  houseController.deleteAHouse
);

module.exports = router;
