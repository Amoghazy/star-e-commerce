import asyncHandler from "./../middlewares/asyancHandelr";
import Category from "./../models/categoryModel";
import { NextFunction, Request, Response } from "express";
import createError from "./../utils/errorCreate";
const createCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    if (!name?.trim() || !name) {
      throw createError.createError(400, "Name Is Required", "Bad Request");
    }
    const categoryExists = await Category.findOne({ name: name.toLowerCase() });
    if (categoryExists) {
      throw createError.createError(409, "Category Already Exists", "Conflict");
    }
    const category = await Category.create({
      name: name.toLowerCase(),
    });
    res.status(200).json({
      success: true,
      message: "Category Created Successfully",
      data: category,
    });
  }
);

const updateCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const { id } = req.params;
    if (!name?.trim() || !name) {
      throw createError.createError(400, "Name Is Required", "Bad Request");
    }
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name: name.toLowerCase(),
      },
      { new: true }
    );
    if (!category) {
      throw createError.createError(404, "Category Not Found", "Not Found");
    }
    res.status(200).json({
      success: true,
      message: "Category Updated Successfully",
      data: category,
    });
  }
);

const deleteCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      throw createError.createError(404, "Category Not Found", "Not Found");
    }
    res.status(200).json({
      success: true,
      message: "Category Deleted Successfully",
      data: category,
    });
  }
);

const listCategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      message: "Categories Found",
      data: categories,
    });
  }
);

const getCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      throw createError.createError(404, "Category Not Found", "Not Found");
    }
    res.status(200).json({
      success: true,
      message: "Category Found",
      data: category,
    });
  }
);
export {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategories,
  getCategory,
};
