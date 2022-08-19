import { Router } from "express";
import authRouter from "./authRouter.js";
import postRouter from "./postsRouter.js";
import timelineRouter from "./timelineRouter.js";
import searchRouter from "./searchRouter.js";
import followersRouter from './followersRouter.js';
import commentsRouter from "./commentsRouter.js";

const router = Router();
router.use(authRouter, postRouter, timelineRouter, searchRouter, followersRouter, commentsRouter);

export default router;
