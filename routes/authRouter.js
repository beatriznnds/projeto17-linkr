import { Router } from 'express';
import schemaValidation from '../middlewares/schemasValidation.js';
import { signUp, signIn, logout } from '../controllers/authController.js';
import signUpSchema from '../schemas/signUpSchema.js';
import userLoginValidationMiddleware from '../middlewares/loginValidation.js';

const authRouter = Router();

authRouter.post('/sign-up', schemaValidation(signUpSchema), signUp);
authRouter.post("/signin", userLoginValidationMiddleware, signIn);
authRouter.delete("/session", logout);

export default authRouter;