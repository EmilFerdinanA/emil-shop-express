import express from "express";
import { PORT } from "./config/env.js";
import connectDB from "./config/db.js";

const app = express();

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Running Bos kuh ${PORT}`);
});
