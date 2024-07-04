import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyancHandelr";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import createError from "../utils/errorCreate";
import genratorToken from "./../utils/genratorToken";
const createUsers = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw createError.createError(
      400,
      "All fields are required",
      "Bad Request"
    );
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw createError.createError(409, "User Already Exists", "Conflict");
  }
  const hasedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hasedPassword });
  genratorToken(res, user._id);
  res.status(201).json({
    success: true,
    message: "User Created Successfully",
    data: user._id,
  });
});
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw createError.createError(
      400,
      "All fields are required",
      "Bad Request"
    );
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw createError.createError(401, "Invalid Credentials", "Unauthorized");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw createError.createError(401, "Invalid Credentials", "Unauthorized");
  }
  genratorToken(res, user._id);
  res.status(200).json({
    success: true,
    message: "Login Successfully",
    data: user._id,
  });
});
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });
});
export { createUsers, loginUser, logoutUser };
