import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db";
import userRoutes from "./routs/userRoutes";
dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(cors());
app.use("/api/user", userRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message + " err middelware ");
  res.status(err.statusCode || 500).json({
    status: err.statusText || "Failed",
    error: true,
    message: err.message || "Internal Server Error",
  });
});

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });
});
