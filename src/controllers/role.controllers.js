import Role from "../models/role.model.js";
import createError from "../utils/createError.js";

const create = async (req, res, next) => {
  try {
    const { name, permissions } = req.body;

    const existingRole = await Role.findOne({ name });
    if (existingRole) throw createError("Role already exist", 409);

    const newRole = await Role.create({ name, permissions });

    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: {
        id: newRole._id,
        name: newRole.name,
        permissions: newRole.permissions,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default { create };
