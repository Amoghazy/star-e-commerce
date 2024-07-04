import { NextFunction, Request, Response } from "express";
import asyncHandler from "./asyancHandelr";
import User from "../models/userModel";
import createError from "../utils/errorCreate";
import jwt from "jsonwebtoken";

const authonticate = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await User.findById((decoded as any).id).select(
          "-password -__v"
        );
        if (!user) {
          throw createError.createError(401, "Invalid token", "Unauthorized");
        }
        req.user = user;
        next();
      } catch (error) {
        throw createError.createError(401, "Invalid Token", "Unauthorized");
      }
    } else {
      throw createError.createError(401, "Not found token", "Unauthorized");
    }
  }
);
const authorizeAdmin = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      throw createError.createError(
        401,
        "You are not authorized to perform this action",
        "Unauthorized"
      );
    }
  }
);
export { authonticate, authorizeAdmin };
