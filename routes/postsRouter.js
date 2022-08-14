import { Router } from "express";
import schemaValidation from "../middlewares/schemasValidation.js";
import {
  newPost,
  editPost,
  deletePost,
  likePost,
  likeGet,
  likeDelete,
} from "../controllers/postsController.js";
import newPostSchema from "../schemas/newPostSchema.js";
import { validateToken } from "../middlewares/tokenValidation.js";

const postRouter = Router();

postRouter.post(
  "/publish",
  schemaValidation(newPostSchema),
  validateToken,
  newPost
);
postRouter.post("/editpost", validateToken, editPost);
postRouter.delete("/deletepost", deletePost);
postRouter.post("/likePost/:id", likePost);
postRouter.delete("/likeDelete/:id", likeDelete);
postRouter.get("/likeGet/:id", likeGet);

export default postRouter;
