import { Router } from 'express';
import { validateToken } from '../middlewares/tokenValidation.js';
import { followUser } from '../controllers/followersController.js';

const followersRouter = Router();

followersRouter.post('/follow', validateToken, followUser);

export default followersRouter;