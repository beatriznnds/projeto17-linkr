import joi from "joi";

const likeSchema = joi.object({
  postId: joi.number().required(),
});

export default likeSchema;