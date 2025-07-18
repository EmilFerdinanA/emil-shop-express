import { Router } from "express";
import authController from "../controllers/auth.controllers.js";
import signInValidation from "../validations/auth/sign-in.validation.js";
import signUpValidation from "../validations/auth/sign-up.validation.js";
import validationMiddleware from "../middleware/validation.middleware.js";

const authRouter = Router();

authRouter.post(
  "/sign-in",
  signInValidation,
  validationMiddleware,
  authController.signIn
);

authRouter.post(
  "/sign-up",
  signUpValidation,
  validationMiddleware,
  authController.signUp
);

export default authRouter;
