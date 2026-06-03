const {
    findAllReviews,
    findReviewById,
    createReview
} = require("../services/reviewService");

const getAllReviews = async (req, res, next) => {
    try {
        const reviews = await findAllReviews(req.user, req.query);
        res.status(200).json({
            code: 200,
            title: "Success",
            message: "Reviews retrieved successfully",
            data: reviews,
        });
    } catch (error) {
        next(error);
    }
};

const getReviewById = async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const review = await findReviewById(reviewId, req.user);
        if (!review) {
            return res.status(404).json({
                code: 404,
                title: "Not Found",
                message: `Review with id ${reviewId} not found`,
            });
        }
        res.status(200).json({
            code: 200,
            title: "Success",
            message: `Review with id ${reviewId} retrieved successfully`,
            data: review,
        });
    } catch (error) {
        next(error);
    }
};
const getReviewByHouse = async (req, res, next) => {
    try {
        const { houseId } = req.params;
        const review = await findReviewByHouse(houseId, req.user);
        if (!review) {
            return res.status(404).json({
                code: 404,
                title: "Not Found",
                message: `Review with id ${houseId} not found`,
            });
        }
        res.status(200).json({
            code: 200,
            title: "Success",
            message: `Review with id ${houseId} retrieved successfully`,
            data: review,
        });
    } catch (error) {
        next(error);
    }
};


const postReview = async (req, res, next) => {
    try {
        const reviewData = req.body;
        const newId = await createReview(reviewData, req.user);
        const createdReview = await findReviewById(newId, req.user);

        res.status(201).json({
            code: 201,
            title: "Created",
            message: "Review created successfully",
            data: createdReview,
        });
    } catch (error) {
        next(error);
    } 
};

module.exports = {
    getAllReviews,
    getReviewById,
    postReview,
    getReviewByHouse
};