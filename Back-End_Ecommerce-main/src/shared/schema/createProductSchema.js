import Joi from "joi";

export const createProductSchema = Joi.object({
    name_product: Joi.string()
        .trim()
        .min(3)
        .max(255)
        .required(),

    slug: Joi.string()
        .trim()
        .regex(/^[a-z0-9-]+$/)
        .required(),

    description: Joi.string()
        .max(2000)
        .allow(""),

    price: Joi.number()
        .positive()
        .precision(2)
        .required(),

    category_id: Joi.number()
        .integer()
        .positive()
        .required(),
});
