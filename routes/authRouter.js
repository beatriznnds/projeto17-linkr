import { Router } from "express";
import schemaValidation from "../middlewares/schemasValidation.js";
import { signUp, signIn, logout } from "../controllers/authController.js";
import signUpSchema from "../schemas/signUpSchema.js";
import signInSchema from "../schemas/signInSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", schemaValidation(signUpSchema), signUp);
authRouter.post("/signin", schemaValidation(signInSchema), signIn);
authRouter.delete("/session", logout);

export default authRouter;
