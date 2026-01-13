import * as ReviewService from './review.services.js';
import { success } from '../../../shared/utils/response.js';
export const getAllReviews = async (req, res, next) => {
    try {
        const reviews = await ReviewService.getReviews(req.params?.product_id);
        return success(res, reviews);
    } catch (error) {
        next(error);
    }
};

export const createReview = async (req, res, next) => {
    try {
        const review = await ReviewService.createReview(req.body);
        return success(res, review, 'Review created successfully');
    } catch (error) {
        next(error);
    }
};

export const deleteReview = async (req, res, next) => {
    try {
        await ReviewService.deleteReview(req.params.id);
        return success(res, 200, 'Review deleted successfully');
    } catch (error) {
        next(error);
    }
};
