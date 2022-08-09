import { Router } from 'express';
import schemaValidation from '../middlewares/schemasValidation.js';
import { signUp } from '../controllers/authController.js';
import signUpSchema from '../schemas/signUpSchema.js';

const router = Router();

router.post('/signup', schemaValidation(signUpSchema), signUp);

export default router;