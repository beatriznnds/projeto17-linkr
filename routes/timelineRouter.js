import { Router } from "express";
import { validateToken } from "../middlewares/tokenValidation.js";
import {
  hashtagTimeline,
  timeline,
  countTimelinePublications,
  trendings,
  userTimeline,
} from "../controllers/timelineController.js";

const timelineRouter = Router();

timelineRouter.get("/timeline/:page", timeline);
timelineRouter.get(
  "/countPublications/:id",
  validateToken,
  countTimelinePublications
);
timelineRouter.get("/user/:id", userTimeline);
timelineRouter.get("/hashtag/:hashtag", hashtagTimeline);
timelineRouter.get("/trendings", trendings);

export default timelineRouter;
