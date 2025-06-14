import mongoose from "mongoose";
import User from "../models/user.model.js";
import Role from "../models/role.model.js";

const signUp = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { username, email, password, role } = req.body;

    // Cek apakah username sudah ada
    const existingUser = await User.findOne({ username }).session(session);
    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    // Cek atau buat role jika belum ada
    let existingRole = await Role.findOne({ name: role }).session(session);
    if (!existingRole) {
      const newRoles = await Role.create([{ name: role }], { session });
      existingRole = newRoles[0]; // ambil object role yang dibuat
    }

    // Buat user baru
    const newUsers = await User.create(
      [
        {
          username,
          email,
          password,
          role: existingRole.name,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUsers[0],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default { signUp };
