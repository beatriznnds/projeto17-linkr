import { Router } from "express";
import { signIn } from "../controllers/authController.js";
const login = Router();

login.post("/signin", signIn);

export default login;