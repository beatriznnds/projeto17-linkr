import Joi from 'joi'

const newPostSchema = Joi.object({
    link: Joi.string()
        .uri()
        .required(),
    description: Joi.string()
})

export default newPostSchema;