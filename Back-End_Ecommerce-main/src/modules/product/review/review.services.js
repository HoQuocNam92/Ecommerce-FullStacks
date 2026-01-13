import * as ReviewRepo from './review.repositories.js';

export const getReviews = (id) => {
    if (!id) throw new Error('Product ID is required');
    return ReviewRepo.getReviewById(id);
};
export const createReview = (data) => {
    if (!data.product_id || !data.user_id || !data.rating || !data.comment) {
        throw new Error('Product ID, User ID, rating and comment are required');
    }
    return ReviewRepo.createReview(data);
};
export const deleteReview = (id) => {
    if (!id) throw new Error('Review ID is required');
    return ReviewRepo.deleteReview(id);
};