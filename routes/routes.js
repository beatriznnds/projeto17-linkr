import { Router } from "express";
import login from "./signInRoute.js";

const router = Router();
router.use(login)

export default router;