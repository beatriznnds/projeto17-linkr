import { Router } from "express";
import schemaValidation from "../middlewares/schemasValidation.js";
import { signUp, logout } from "../controllers/authController.js";
import signUpSchema from "../schemas/signUpSchema.js";

const router = Router();

router.post("/sign-up", schemaValidation(signUpSchema), signUp);
router.delete("/session", logout);

export default router;
