import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
    },
    active: {
      type: Boolean,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      ref: "role",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
