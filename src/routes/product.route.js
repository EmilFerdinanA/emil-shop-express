import { Router } from "express";
import uploadImage from "../middleware/upload-image.middleware.js";
import permissionMiddleware from "../middleware/permission.middleware.js";
import productControllers from "../controllers/product.controllers.js";

const productRouter = Router();

productRouter.post(
  "/",
  permissionMiddleware("create_product"),
  uploadImage.array("images", 5),
  productControllers.create
);

export default productRouter;
