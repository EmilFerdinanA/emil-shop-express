import Role from "../models/role.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const seedSuperAdmin = async () => {
  try {
    let superAdminRole = await Role.findOne({ name: "super_admin" });

    if (!superAdminRole) {
      superAdminRole = await Role.create({
        name: "super_admin",
        permissions: ["super_admin"],
      });
    }

    const existingUser = await User.findOne({ username: "super_admin" });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("P@ssw0rd", 10);
      await User.create({
        username: "super_admin",
        email: "superadmin@rules.com",
        password: hashedPassword,
        role: superAdminRole._id,
      });
      console.log("✅ Super admin created.");
    } else {
      console.log("ℹ️ Super admin already exists.");
    }
  } catch (error) {
    console.error("❌ Error seeding super admin:", error);
  }
};
