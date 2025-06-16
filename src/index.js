import express from "express";
import { NODE_ENV, PORT } from "./config/env.js";
import connectDB from "./config/db.js";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import roleRouter from "./routes/role.route.js";

import verifyToken from "./middleware/auth.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";
import { seedSuperAdmin } from "./seeder/super_admin.seed.js";

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.use(verifyToken);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/role", roleRouter);

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDB();
    if (NODE_ENV === "development") {
      await seedSuperAdmin();
    }
    app.listen(PORT, () => {
      console.log(`🚀 Running Bos kuh ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Startup failed:", error);
    process.exit(1);
  }
};

startServer();
