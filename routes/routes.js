import { Router } from "express";
import authRouter from "./authRouter.js";
import postRouter from "./postsRouter.js";
import likesRouter from './likesRouter.js';

const router = Router();
router.use(authRouter, postRouter, likesRouter)

export default router;