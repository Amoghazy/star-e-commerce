import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyancHandelr";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import createError from "../utils/errorCreate";
import genratorToken from "./../utils/genratorToken";
const createUsers = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password, confirmPassword } = req.body;
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
  if (password !== confirmPassword) {
    throw createError.createError(400, "Password Not Match", "Bad Request");
  }
  const hasedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hasedPassword });
  genratorToken(res, user._id);
  res.status(201).json({
    success: true,
    message: "User Created Successfully",
    data: {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
});
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body);
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
    throw createError.createError(401, "Wrong Email or Password", "Faield");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw createError.createError(401, "Wrong Email or Password", "Faield");
  }
  genratorToken(res, user._id);
  res.status(200).json({
    success: true,
    message: "Login Successfully",
    data: {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
});
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });
});
const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find().select("-password -__v");
  res.status(200).json({
    success: true,
    message: "All Users",
    data: users,
  });
});
const getCurrentUserProfile = asyncHandler(async (req: any, res: Response) => {
  const user = await User.findById(req.user._id).select("-password -__v");
  if (!user) {
    throw createError.createError(404, "User Not Found", "Not Found");
  }
  res.status(200).json({
    success: true,
    message: "Current User",
    data: user,
  });
});
const updateCurrentUserProfile = asyncHandler(
  async (req: any, res: Response) => {
    const user = await User.findById(req.user._id).select(
      "-password -__v -createdAt -updatedAt"
    );
    if (!user) {
      throw createError.createError(404, "User Not Found", "Not Found");
    }

    const { username, email, password } = req.body;

    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    if (req.user.isAdmin && req.body.isAdmin) {
      user.isAdmin = req.body.isAdmin;
    }
    await user.save();

    res.status(200).json({
      success: true,
      message: "Updated User",
      data: user,
    });
  }
);
const deleteSpecificUser = asyncHandler(async (req: any, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw createError.createError(404, "User Not Found", "Not Found");
  }
  if (user.isAdmin) {
    throw createError.createError(403, "Not Allowed", "Forbidden");
  }
  await User.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

const getUserById = asyncHandler(async (req: any, res: Response) => {
  const user = await User.findById(req.params.id).select("-password -__v");
  if (!user) {
    throw createError.createError(404, "User Not Found", "Not Found");
  }
  res.status(200).json({
    success: true,
    message: "User Found",
    data: user,
  });
});
const updateUserById = asyncHandler(async (req: any, res: Response) => {
  const user = await User.findById(req.params.id).select(
    "-password -__v -createdAt "
  );
  if (!user) {
    throw createError.createError(404, "User Not Found", "Not Found");
  }
  if (user.isAdmin) {
    throw createError.createError(403, "Not Allowed", "Forbidden");
  }
  const { username, email, password, isAdmin } = req.body;
  if (username) {
    user.username = username;
  }
  if (email) {
    user.email = email;
  }
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
  if (isAdmin) {
    user.isAdmin = Boolean(isAdmin);
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: "User Updated Successfully",
    data: user,
  });
});
export {
  createUsers,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteSpecificUser,
  getUserById,
  updateUserById,
};
