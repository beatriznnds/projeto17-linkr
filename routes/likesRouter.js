import { Router } from "express";
import { validateToken } from "../middlewares/tokenValidation.js";
import {
    likePost,
    unlikePost,
    getLikes,
    getCountLikes,
    getNames
} from '../controllers/likesController.js';

const like = Router();

like.post('/like', validateToken, likePost);
like.get('/like', validateToken, getLikes);
like.delete('/like', validateToken, unlikePost);
like.get('/like/count', getCountLikes);
like.get('/like/names', validateToken, getNames);

export default like;