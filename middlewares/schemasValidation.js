const schemaValidation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(422).send(error.details.map(detail => detail.message));
        }
        next();
    };
};

export default schemaValidation;