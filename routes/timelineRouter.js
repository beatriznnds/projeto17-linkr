import { Router } from "express";
import { timeline } from "../controllers/timelineController.js";

const timelineRouter = Router();

timelineRouter.get("/timeline", timeline);

export default timelineRouter;
