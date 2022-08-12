import { Router } from 'express';
import schemaValidation from '../middlewares/schemasValidation.js';
import { newPost, editPost, deletePost } from '../controllers/postsController.js';
import newPostSchema from '../schemas/newPostSchema.js';
import { validateToken } from '../middlewares/tokenValidation.js';

const postRouter = Router();

postRouter.post('/publish', schemaValidation(newPostSchema), validateToken, newPost);
postRouter.post('/editpost', validateToken, editPost);
postRouter.delete('/deletepost/:id', validateToken, deletePost)

export default postRouter;