import { validationResult } from "express-validator";
import createError from "../utils/createError.js";

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array()[0].msg;
    return next(createError(message, 422));
  }
  next();
};

export default validationMiddleware;
