const {db} = require('../config/database');

const findAllReviews = async (user, filters = {}) => {
    let query = db("Reviews as r")
        .select(
            "r.id_review",
            "r.rating",
            "r.comment",
            "r.id_house",
            "r.id_user"
        )
        .join("Users as u", "r.id_user", "u.id_user")
        .join("Houses as h", "r.id_house", "h.id_house");
    }
const findReviewById = async (reviewId, user) => {
    let query = db("Reviews as r")
        .select(
            "r.id_review",
            "r.rating",
            "r.comment",
            "r.id_house",
            "r.id_user"
        )
        .join("Users as u", "r.id_user", "u.id_user")
        .join("Houses as h", "r.id_house", "h.id_house")
        .where("r.id_review", reviewId);
    }
const createReview = async (reviewData) => {

    const dataToInsert = {
        rating: reviewData.rating,
        comment: reviewData.comment,
        id_house: reviewData.id_house,
        id_user: reviewData.id_user
    };

    const [createdReview] = await db("Reviews").insert(dataToInsert).returning("*");
    return createdReview;
}

