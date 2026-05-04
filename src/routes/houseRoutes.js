const express = require("express");
const router = express.Router();

// Importamos el controlador de houses
const houseController = require("../controllers/houseController");

// Importamos los middlewares de seguridad
const { authenticateToken, isAdmin } = require("../middlewares/authMiddleware");

// Verificar que hay un usuario logueado y guardar los datos en req.user
// (Descomenta la siguiente línea si quieres que todas las rutas de houses requieran autenticación)
// router.use(authenticateToken);

// RUTAS DE HOUSES

// GET /houses -> Obtiene todas las casas
router.get("/", houseController.getAllHouses);

// GET /houses/:houseId -> Obtiene la información de una casa específica
router.get("/:houseId", houseController.getHouseById);

// POST /houses -> Crea una nueva casa
router.post("/", authenticateToken, houseController.postHouse);

// PUT /houses/:houseId -> Actualiza la información de una casa
router.put("/:houseId", authenticateToken, houseController.putHouse);

// DELETE /houses/:houseId -> Elimina una casa
router.delete(
  "/:houseId",
  authenticateToken,
  isAdmin,
  houseController.deleteAHouse,
);

module.exports = router;
