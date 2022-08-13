import { Router } from "express";
import { validateToken } from "../middlewares/tokenValidation.js";
import schemaValidation from "../middlewares/schemasValidation.js";
import likeSchema from '../schemas/likesSchema.js';
import {
    likePost,
    unlikePost,
    getLikes,
    getCountLikes,
    getNames
} from '../controllers/likesController.js';
import { validateParam } from "../middlewares/likesValidation.js";

const like = Router();

like.post('/like', validateToken, schemaValidation(likeSchema), likePost);
like.get('/like/:id', validateToken, validateParam, getLikes);
like.delete('/like/:id', validateToken, validateParam, unlikePost);
like.get('/like/count/:id', validateParam, getCountLikes);
like.get('/like/names/:id', validateToken, validateParam, getNames);

export default like;