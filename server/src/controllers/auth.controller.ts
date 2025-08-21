import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../utils/jwt";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ message: "Invalid Email or Password." });
    const isMatch = user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Email or Password." });

    const token = generateToken({ uid: user._id.toString() });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });
    res.status(200).json({ uid: user._id });
  } catch (error) {
    return res.status(500).json({ message: "Login Error." });
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nickname, fullName, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "User Already Exists." });
    const user = await User.create({ nickname, fullName, email, password });

    const token = generateToken({ uid: user._id.toString() });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });
    res.status(201).json({
      uid: user._id,
    });
  } catch (error) {
    return res.status(500).json({ message: "Signup Error." });
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uid = req.uid;
    const user = await User.findById(uid).select("-password");
    if (!user) return res.status(404).json({ message: "User Not Found." });

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server Error." });
  }
};
