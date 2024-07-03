import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyancHandelr";

const createUsers = asyncHandler(async (req: Request, res: Response) => {
  res.send("create user");
});
export { createUsers };
