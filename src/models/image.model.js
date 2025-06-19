import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const imageSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    path: { type: String, required: true },
    product: { type: String, ref: "Product", required: true },
    size: { type: Number, required: true },
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);
export default Image;
