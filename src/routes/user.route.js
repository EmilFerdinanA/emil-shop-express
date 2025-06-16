import { Router } from "express";
import userController from "../controllers/user.controllers.js";
import permissionMiddleware from "../middleware/permission.middleware.js";

const userRouter = Router();

userRouter.get("/", permissionMiddleware("read_user"), userController.getAll);

export default userRouter;
