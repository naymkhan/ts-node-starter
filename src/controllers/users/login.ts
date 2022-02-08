import { NextFunction, Request, Response } from "express";
const { body, validationResult } = require("express-validator");

import { asyncHandler } from "./../../middlewares";
import { generateToken } from "../../utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  errorFormat: "pretty",
});

export const login = [
  //check fields for validation
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .bail()
    .isEmail()
    .withMessage("please provide a valid email"),
  //throw error for validation
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: errors.array()[0].msg, ref: errors.array()[0].param });
    } else {
      next();
    }
  },
  //controller
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(404).json({ message: "No user found." });
    }

    if (req.body.password !== user.password) {
      return res.status(403).json({ message: "invalid credentials." });
    }

    const token = generateToken({ id: user.id });

    return res.status(200).json({ message: "Login successful.", user, token });
  }),
];

export default login;
