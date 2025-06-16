import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import createError from "../utils/createError.js";

const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { username, email, password, role } = req.body;

    const [existingUser, existingEmail] = await Promise.all([
      User.findOne({ username }).session(session),
      User.findOne({ email }).session(session),
    ]);
    if (existingUser) throw createError("Username already exists", 409);
    if (existingEmail) throw createError("Email already exists", 409);

    const existingRole = await Role.findOne({ name: role }).session(session);
    if (!existingRole) throw createError("Invalid role", 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: existingRole._id,
      active: false,
    });
    await newUser.save({ session });

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username }).populate(
      "role",
      "name permissions -_id"
    );
    if (!existingUser) throw createError("User not found", 404);

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) throw createError("Invalid password", 401);

    const userPayload = {
      id: existingUser._id,
      username: existingUser.username,
      role: existingUser.role.name,
    };

    const token = jwt.sign(userPayload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          username: existingUser.username,
          email: existingUser.email,
          role: existingUser.role.name,
          permissions: existingUser.role.permissions,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export default { signUp, signIn };
