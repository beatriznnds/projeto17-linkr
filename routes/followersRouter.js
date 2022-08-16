import { Router } from 'express';
import { validateToken } from '../middlewares/tokenValidation.js';
import { followUser, checkFollow } from '../controllers/followersController.js';

const followersRouter = Router();

followersRouter.post('/follow', validateToken, followUser);
followersRouter.get('/followers', validateToken, checkFollow);

export default followersRouter;