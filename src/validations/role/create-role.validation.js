import { body } from "express-validator";

const createRoleValidation = [
  body("name")
    .notEmpty()
    .withMessage("Role name is required")
    .isString()
    .withMessage("Role name must be a string")
    .isLength({ min: 3 })
    .withMessage("Role name must be at least 3 characters long")
    .custom((value) => value.trim().toLowerCase() !== "super_admin")
    .withMessage("Role name 'super_admin' is not allowed"),

  body("permissions")
    .isArray({ min: 1 })
    .withMessage("Permissions must be a non-empty array")
    .custom((arr) =>
      arr.every(
        (perm) =>
          typeof perm === "string" &&
          perm.trim().length > 0 &&
          !/\s/.test(perm) &&
          perm.trim().toLowerCase() !== "super_admin"
      )
    )
    .withMessage(
      "Permissions must be non-empty strings, contain no spaces, and must not include 'super_admin'"
    ),
];

export default createRoleValidation;
