import { Router } from "express";
import { timeline, userTimeline } from "../controllers/timelineController.js";

const timelineRouter = Router();

timelineRouter.get("/timeline", timeline);
timelineRouter.get("/user/:id", userTimeline);

export default timelineRouter;
