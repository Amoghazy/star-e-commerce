import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";
import path from "path";
dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(cors());
const parentDir = path.dirname(__dirname);

app.use("/uploads", express.static(path.join(parentDir, "/uploads")));
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

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
