import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Unauthorized." });

    const payload = verifyToken(token);
    if (!payload)
      return res.status(401).json({ message: "Invalid or Expired Token." });

    req.uid = payload.uid;
    next();
  } catch (error) {
    next(error);
  }
};
