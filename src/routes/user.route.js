import { Router } from "express";
import userController from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.get("/", userController.getAll);

export default userRouter;
