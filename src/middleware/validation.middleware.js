import { validationResult } from "express-validator";

const validationMiddleware = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((e) => e.msg);
    const error = new Error(errorMessage[0]);
    error.statusCode = 422;
    return next(error);
  }
  next();
};

export default validationMiddleware;
