import { Router } from "express";
import { validateToken } from "../middlewares/tokenValidation.js";
import schemaValidation from "../middlewares/schemasValidation.js";
import commentsSchema from "../schemas/commentsSchema.js";
import { postComment, getCommentsById } from "../controllers/commentsController.js";

const commentsRouter = Router();

commentsRouter.post("/comments/:id", validateToken, schemaValidation(commentsSchema), postComment);
commentsRouter.get("/comments/:id", validateToken, getCommentsById);

export default commentsRouter;