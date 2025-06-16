import mongoose from "mongoose";
import { DB_URI } from "./env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("✅ DB connected");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
