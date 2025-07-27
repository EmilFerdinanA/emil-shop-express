import { Router } from "express";
import roleControllers from "../controllers/role.controllers.js";
import createRoleValidation from "../validations/role/create-role.validation.js";
import validationMiddleware from "../middleware/validation.middleware.js";

const roleRouter = Router();

roleRouter.get("/", roleControllers.getAll);

roleRouter.post(
  "/",
  createRoleValidation,
  validationMiddleware,
  roleControllers.create
);

export default roleRouter;
