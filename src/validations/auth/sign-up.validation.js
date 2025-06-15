import { body } from "express-validator";

const signUpValidation = [
  body("username").trim().notEmpty().withMessage("Username is required"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one symbol"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["super_admin", "seller", "customer"])
    .withMessage("Role must be one of: super_admin, seller, customer"),
  ,
];

export default signUpValidation;
