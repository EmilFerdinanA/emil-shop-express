import createError from "../utils/createError.js";

const permissionMiddleware = (requiredPermission) => {
  return (req, res, next) => {
    const userPermission = req.user.permissions || [];

    if (userPermission.includes("super_admin")) {
      return next();
    }

    const hasPermission = userPermission.includes(requiredPermission);
    if (!hasPermission) {
      console.log("masuk sini");
      return next(
        createError(
          "Access denied. You do not have the required permission.",
          403
        )
      );
    }

    next();
  };
};

export default permissionMiddleware;
