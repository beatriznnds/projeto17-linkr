import { Router } from 'express';
import schemaValidation from '../middlewares/schemasValidation.js';
import { signUp, signIn } from '../controllers/authController.js';
import signUpSchema from '../schemas/signUpSchema.js';

const authRouter = Router();

authRouter.post('/sign-up', schemaValidation(signUpSchema), signUp);
authRouter.post("/signin", signIn);

export default authRouter;