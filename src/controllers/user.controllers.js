import User from "../models/user.model.js";

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

    const [users, total] = await Promise.all([
      User.find(filter).skip(skip).limit(limit),
      User.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    const userResponse = users.map((user) => ({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    }));

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: userResponse,
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

export default { getAll };
