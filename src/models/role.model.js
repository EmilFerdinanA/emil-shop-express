import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const roleSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    permissions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);
export default Role;
