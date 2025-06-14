import express from "express";
import { PORT } from "./config/env.js";
import connectDB from "./config/db.js";

import authRouter from "./routes/auth.route.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Running Bos kuh ${PORT}`);
});
