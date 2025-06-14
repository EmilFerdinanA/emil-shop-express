import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Role from "../models/role.model.js";

const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ username }).session(session);
    const existingEmail = await User.findOne({ email }).session(session);
    if (existingUser || existingEmail) {
      const error = new Error("Username or Email already exists");
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
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export default { signUp };
