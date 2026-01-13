export const validate = (schema, property = "body", data = null) => {
    return (req, res, next) => {
        const { error } = schema.validate(data ?? req[property], {
            abortEarly: false,
        });

        if (error) {
            return res.status(400).json({
                message: "Validation error",
                errors: error.details.map(e => ({
                    field: e.path.join("."),
                    message: e.message,
                })),
            });
        }

        next();
    };
};
