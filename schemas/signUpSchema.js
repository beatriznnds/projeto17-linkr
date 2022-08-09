import Joi from 'joi';

const signUpSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .max(50),
    password: Joi.string()
        .required()
        .max(8),
    username: Joi.string()
        .max(20)
        .required(),
    profilePic: Joi.string()
        .required()
        .regex(/[a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif)/)
});

export default signUpSchema;