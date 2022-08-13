import { Router } from "express";
import { searchUser } from "../controllers/searchController.js";

const searchRouter = Router();

searchRouter.post("/search", searchUser);

export default searchRouter;