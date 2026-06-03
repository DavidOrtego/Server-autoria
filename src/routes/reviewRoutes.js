const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { handleValidationErrors } = require("../middlewares/errorHandler");
const { reviewIdValidator, postReviewValidator } = require("../validators/reviewValidator");

router.use(authenticateToken);

// GET todas las reviews
router.get("/", reviewController.getAllReviews);
// GET reviews de una casa
router.get("/house/:houseId", reviewController.getReviewByHouse);

// GET  reviw específica
router.get("/:reviewId", reviewIdValidator, handleValidationErrors, reviewController.getReviewById);

// POST  Crea una nueva review 
router.post("/", postReviewValidator, handleValidationErrors, reviewController.postReview);

module.exports = router;