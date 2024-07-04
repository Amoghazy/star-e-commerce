import { Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const genratorToken = (res: Response, id: mongoose.Types.ObjectId) => {
  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export default genratorToken;
