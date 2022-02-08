import { NextFunction, Request, Response } from "express";

import { asyncHandler } from "./../../middlewares";
import { generateToken } from "../../utils";
import { PrismaClient } from "@prisma/client";

const { body, validationResult } = require("express-validator");

const prisma = new PrismaClient({
  // errorFormat: "pretty",
});

export const register = [
  //check fields for validation
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .bail()
    .isEmail()
    .withMessage("please provide a valid email"),
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .bail()
    .isString()
    .withMessage("username must be aplanumaric values"),
  //throw error for validation
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      throw new Error(errors.array()[0].msg);
    } else {
      next();
    }
  },
  // controller
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await prisma.user.create({
      data: { ...req.body },
    });

    const token = generateToken({ id: newUser.id });

    return res
      .status(200)
      .json({ message: "Registration successful.", user: newUser, token });
  }),
];

export default register;
