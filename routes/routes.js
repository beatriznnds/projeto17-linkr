import { Router } from "express";
import authRouter from "./authRouter.js";
import postRouter from "./postsRouter.js";

const router = Router();
router.use(authRouter, postRouter)

export default router;