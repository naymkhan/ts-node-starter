import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.code === "P2002") {
    if (err.meta.target === "User_username_key") {
      return res.status(409).json({
        message: "there are already a user created with this username",
        ref: "username",
      });
    } else if (err.meta.target === "User_email_key") {
      return res.status(409).json({
        message: "there are already a user created with this email",
        ref: "email",
      });
    }
  }
  return res.status(500).json({ err: err });
}
