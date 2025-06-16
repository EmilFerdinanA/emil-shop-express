import { Router } from "express";
import roleControllers from "../controllers/role.controllers.js";

const roleRouter = Router();

roleRouter.post("/", roleControllers.create);

export default roleRouter;
