import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import createError from "../utils/errorCreate";
const checkValidId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const validId = isValidObjectId(id);
  if (!validId) {
    next(createError.createError(400, "Invalid Id", "Bad Request"));
  }

  next();
};
export default checkValidId;
