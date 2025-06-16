import express from "express";
import { PORT } from "./config/env.js";
import connectDB from "./config/db.js";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import roleRouter from "./routes/role.route.js";

import errorMiddleware from "./middleware/error.middleware.js";

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/role", roleRouter);

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Running Bos kuh ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Startup failed:", error);
    process.exit(1);
  }
};

startServer();
