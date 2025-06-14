import { Router } from "express";
import authController from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.get("/", (req, res) => res.status(200).json({ message: "success" }));
authRouter.post("/", authController.signUp);

export default authRouter;
