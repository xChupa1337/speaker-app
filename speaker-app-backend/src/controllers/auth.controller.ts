import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { HttpError } from "../utils/error-type";
import { User } from "../models/user.model";
import { JWT_SECRET } from "../config/env";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, name } = req.body || {};
    if (!email || !password || !name || !name.trim()) {
      return next(new HttpError("Enter correct data", 400));
    }
    if (password.length < 6) {
      return next(new HttpError("Enter stronger password", 400));
    }
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return next(new HttpError("Something went wrong", 400));
    }
    const hashPassword = await bcrypt.hash(password, 8);
    const user = await User.create({ name, email, password: hashPassword });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({ success: true, data: { token, user } });
  } catch (e) {
    next(e);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return next(new HttpError("Enter correct data", 400));
    }
    if (password.length < 6) {
      return next(new HttpError("Enter stronger password", 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(new HttpError("Something went wrong", 400));
    }
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return next(new HttpError("Something went wrong", 400));
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({ success: true, data: { token, user } });
  } catch (e) {
    next(e);
  }
};
