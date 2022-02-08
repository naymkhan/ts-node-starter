import { NextFunction, Request, Response } from "express";
const { validationResult } = require("express-validator");

export default function validate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(errors.array()[0].msg);
  }
}
