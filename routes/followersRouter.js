import { Router } from 'express';
import { validateToken } from '../middlewares/tokenValidation.js';
import { followUser, checkFollow, checkIfUserFollows } from '../controllers/followersController.js';

const followersRouter = Router();

followersRouter.post('/follow', validateToken, followUser);
followersRouter.get('/followers', validateToken, checkFollow);
followersRouter.get('/following', validateToken, checkIfUserFollows);

export default followersRouter;