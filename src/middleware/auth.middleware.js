import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Access token is missing or invalid");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
