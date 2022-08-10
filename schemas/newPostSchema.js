import Joi from 'joi'

const newPostSchema = Joi.object({
    link: Joi.string()
        .uri()
        .required()
})

export default newPostSchema;