import { Router } from "express";
import authRouter from "./authRouter.js";
import postRouter from "./postsRouter.js";
import timelineRouter from "./timelineRouter.js";

const router = Router();
router.use(authRouter, postRouter, timelineRouter);

export default router;
