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

const getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { username } = req.query;

    let filter = {};
    if (username) {
      filter.username = { $regex: username, $options: "i" };
    }

    const [role, total] = await Promise.all([
      Role.find(filter).skip(skip).limit(limit),
      Role.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    const roleResponse = role.map((role) => ({
      id: role._id,
      name: role.name,
      permissions: role.permissions,
    }));

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: roleResponse,
      pagination: {
        total,
        page,
        totalPages,
        limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default { getAll, create };
