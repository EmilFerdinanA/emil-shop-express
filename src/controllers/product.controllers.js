import fs from "fs";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import Image from "../models/image.model.js";

const create = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { name, description, price, stock } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
    });
    await newProduct.save({ session });

    const newImage = await Promise.all(
      req.files.map(({ filename, size, path }) => {
        const newImage = new Image({
          name: filename,
          size,
          path,
          product: newProduct._id,
        });
        return newImage.save({ session });
      })
    );

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: {
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        stock: newProduct.stock,
        images: newImage.map((image) => image.name),
      },
    });
  } catch (error) {
    req.files?.forEach((file) => {
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    });

    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export default { create };
