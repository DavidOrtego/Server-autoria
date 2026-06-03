const { body, param } = require("express-validator");

const reviewIdValidator = [
  param("reviewId")
    .isInt({ min: 1 })
    .withMessage("Review ID must be a positive integer"),
];

const postReviewValidator = [
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5."),
  body("comment")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("Comment cannot exceed 255 characters."),
  body("id_house")
    .isInt({ min: 1 })
    .withMessage("House ID must be a positive integer."),
];

module.exports = {
  reviewIdValidator,
  postReviewValidator,
};
