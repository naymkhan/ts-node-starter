import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(404).json({ message: "not found" });
}
