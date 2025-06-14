import { Router } from "express";
import authController from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/sign-in", authController.signIn);
authRouter.post("/sign-up", authController.signUp);

export default authRouter;
