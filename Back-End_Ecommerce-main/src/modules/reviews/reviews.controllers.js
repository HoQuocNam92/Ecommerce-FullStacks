import * as ReviewServices from './reviews.services.js';
import { success } from '#src/shared/utils/response.js';
import { validate } from '#src/shared/middlewares/validate.middleware.js';
import { createReviewSchema } from "#shared/schema/createReviewSchema.js"
export const getReviewsByProduct = async (req, res, next) => {
    try {
        const reviews = await ReviewServices.getReviewsByProduct(req.params.productId)
        return success(res, reviews, "Lấy danh sách bình luận theo sản phẩm thành công")
    } catch (error) {
        next(error)
    }
};

export const createReviewsByProduct = async (req, res, next) => {
    try {


        const data = { ...req.body, userId: req.user.id };
        const { error, value } = createReviewSchema.validate(data, {
            abortEarly: false
        })
        if (error) {
            return res.status(400).json({
                message: "Validation error",
                errors: error.details.map(e => ({
                    field: e.path.join("."),
                    message: e.message,
                })),
            });
        }
        const imagesFile = req.files.images || [];
        const result = await ReviewServices.createReviewByProduct(value, imagesFile)
        return success(res, result, "Tạo bình luận cho sản phẩm thành công")
    } catch (error) {
        next(error)
    }
};


