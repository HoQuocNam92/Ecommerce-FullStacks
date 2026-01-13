import Joi from "joi";

export const createReviewSchema = Joi.object({
    product_id: Joi.number()
        .required()
        .messages({
            "any.required": "product_id là bắt buộc",
            "number.base": "product_id phải là số",
        }),

    userId: Joi.number()
        .required()
        .messages({
            "any.required": "userId là bắt buộc",
            "number.base": "userId phải là số",
        }),

    orderId: Joi.number()
        .required()
        .messages({
            "any.required": "orderId là bắt buộc",
            "number.base": "orderId phải là số",
        }),

    rating: Joi.number()
        .min(1)
        .max(5)
        .required()
        .messages({
            "any.required": "rating là bắt buộc",
            "number.min": "rating tối thiểu là 1",
            "number.max": "rating tối đa là 5",
            "number.base": "rating phải là số",
        }),

    content: Joi.string()
        .max(255)
        .required()
        .messages({
            "any.required": "Nội dung đánh giá không được để trống",
            "string.max": "Nội dung tối đa 255 ký tự",
            "string.base": "Nội dung phải là chuỗi",
        }),
});
