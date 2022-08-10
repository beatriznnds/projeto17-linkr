import { Router } from "express";
import schemaValidation from "../middlewares/schemasValidation.js";
import { newPost } from "../controllers/postsController.js";
import newPostSchema from "../schemas/newPostSchema.js";

const router = Router();

router.post("/publish", schemaValidation(newPostSchema), newPost);

export default router;
