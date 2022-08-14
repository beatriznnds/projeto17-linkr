import { Router } from "express";
import { hashtagTimeline, timeline, trendings, userTimeline } from "../controllers/timelineController.js";

const timelineRouter = Router();

timelineRouter.get("/timeline", timeline);
timelineRouter.get("/user/:id", userTimeline);
timelineRouter.get("/hashtag/:hashtag", hashtagTimeline); 
timelineRouter.get("/trendings", trendings);

export default timelineRouter;
