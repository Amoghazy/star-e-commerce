import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyancHandelr";
import Product from "../models/productModel";
import createError from "../utils/errorCreate";
const createProduct = asyncHandler(async (req: Request, res: Response) => {
  req.body.image = req.file?.path
    ? req.file?.path.replace(/\\/g, "/")
    : req.body.image[0].replace(/\\/g, "/");
  const { name, brand, category, price, description, image } = req.body;
  switch (true) {
    case !name?.trim() || !name:
      throw createError.createError(400, "Name Is Required", "Bad Request");
    case !brand?.trim() || !brand:
      throw createError.createError(400, "Brand Is Required", "Bad Request");
    case !category?.trim() || !category:
      throw createError.createError(400, "Category Is Required", "Bad Request");
    case !price || price <= 0:
      throw createError.createError(400, "Price Is Required", "Bad Request");
    case !description?.trim() || !description:
      throw createError.createError(
        400,
        "Description Is Required",
        "Bad Request"
      );
    case !image?.trim() || !image:
      throw createError.createError(400, "Image Is Required", "Bad Request");
    default: {
      const product = await Product.create(req.body);

      res.status(201).json({
        success: true,
        message: "Product Created Successfully",
        data: product,
      });
    }
  }
});

const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
    data: product,
  });
});
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  req.body.image = req.file?.path
    ? req.file?.path.replace(/\\/g, "/")
    : req.body.image[0].replace(/\\/g, "/");
  const { name, brand, category, price, description, image } = req.body;
  const { id } = req.params;
  console.log(image);
  switch (true) {
    case !name?.trim() || !name:
      throw createError.createError(400, "Name Is Required", "Bad Request");
    case !brand?.trim() || !brand:
      throw createError.createError(400, "Brand Is Required", "Bad Request");
    case !category?.trim() || !category:
      throw createError.createError(400, "Category Is Required", "Bad Request");
    case !price || price <= 0:
      throw createError.createError(400, "Price Is Required", "Bad Request");
    case !description?.trim() || !description:
      throw createError.createError(
        400,
        "Description Is Required",
        "Bad Request"
      );
    case !image?.trim() || !image:
      throw createError.createError(400, "Image Is Required", "Bad Request");
    default: {
      const newProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!newProduct) {
        throw createError.createError(404, "Product Not Found", "Not Found");
      }
      res.status(200).json({
        success: true,
        message: "Product Updated Successfully",
        data: newProduct,
      });
    }
  }
});
const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const productsCount = await Product.countDocuments();
  const products = await Product.find({})
    .populate("category")
    .skip(skip)
    .limit(limit);
  res.status(200).json({
    success: true,
    message: "Products Found",
    data: products,
    count: productsCount,
    page: page,
    pages: Math.ceil(productsCount / limit),
  });
});
const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    throw createError.createError(404, "Product Not Found", "Not Found");
  }
  res.status(200).json({
    success: true,
    message: "Product Found",
    data: product,
  });
});
const addProductReview = asyncHandler(async (req: any, res: Response) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw createError.createError(404, "Product Not Found", "Not Found");
  }
  const alreadyReviewed = product.reviews.find(
    (r: any) => r.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) {
    throw createError.createError(
      400,
      "Product Already Reviewed",
      "Bad Request"
    );
  }
  const review = {
    name: req.user.username,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };
  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc: any, item: any) => item.rating + acc, 0) /
    product.reviews.length;
  await product.save();
  res.status(200).json({
    success: true,
    message: "Review Added Successfully",
    data: {
      productId: product._id,
      ...review,
    },
  });
});
const getTopProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(16);
  res.status(200).json({
    success: true,
    message: "Top Products Found",
    data: products,
  });
});
const getNewProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(16);
  res.status(200).json({
    success: true,
    message: "New Products Found",
    data: products,
  });
});
export {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  addProductReview,
  getTopProducts,
  getNewProducts,
};
