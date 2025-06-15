import { Router } from "express";
import userController from "../controllers/user.controllers.js";
import verifyToken from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", verifyToken, userController.getAll);

export default userRouter;
