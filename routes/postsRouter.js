import { Router } from 'express';
import schemaValidation from '../middlewares/schemasValidation.js';
import { newPost } from '../controllers/postsController.js';
import newPostSchema from '../schemas/newPostSchema.js';
import { validateToken } from '../middlewares/tokenValidation.js';
const postRouter = Router();

postRouter.post('/publish', schemaValidation(newPostSchema), validateToken, newPost)

export default postRouter;