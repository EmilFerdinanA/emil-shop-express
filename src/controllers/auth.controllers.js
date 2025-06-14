import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import User from "../models/user.model.js";
import Role from "../models/role.model.js";

const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ username }).session(session);
    if (existingUser) {
      const error = new Error("Username already exists");
      error.statusCode = 409;
      throw error;
    }

    const existingEmail = await User.findOne({ email }).session(session);
    if (existingEmail) {
      const error = new Error("Email already exists");
      error.statusCode = 409;
      throw error;
    }

    let existingRole = await Role.findOne({ name: role }).session(session);
    if (!existingRole) {
      [existingRole] = await Role.create([{ name: role }], { session });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await User.create(
      [
        {
          username,
          email,
          password: hashedPassword,
          role: existingRole.name,
          active: false,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    const userResponse = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    };

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: userResponse,
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
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    const userResponse = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      role: existingUser.role,
    };

    const token = jwt.sign(userResponse, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: userResponse,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default { signUp, signIn };
