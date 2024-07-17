import { NextFunction, Response } from "express";
import asyncHandler from "../middlewares/asyancHandelr";
import createError from "../utils/errorCreate";
import Order from "./../models/orderModel";
import Product from "../models/productModel";

const calcPriceOfProducts = (orderItems: any) => {
  const totalPriceItems = orderItems
    .reduce((acc: any, item: any) => acc + item.price * item.countPices, 0)
    .toFixed(2);
  const shippingPrice = totalPriceItems > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * totalPriceItems).toFixed(2));
  return {
    totalPriceItems,
    shippingPrice,
    taxPrice,
    totalPrice:
      Number(totalPriceItems) + Number(shippingPrice) + Number(taxPrice),
  };
};
const createOrder = asyncHandler(async (req: any, res: Response) => {
  let { orderItems, shippingAddress, paymentMethod } = req.body;
  const { user } = req;

  const productsDB = await Product.find({
    _id: { $in: orderItems.map((item: any) => item._id) },
  });

  if (!productsDB.length) {
    throw createError.createError(
      404,
      " Some Product Not Found in Db",
      "Not Found"
    );
  }
  if (orderItems.length !== productsDB.length) {
    throw createError.createError(404, "Some Product Not Found", "Not Found");
  }

  const checkAllProductsInDb = productsDB.every((product: any) => {
    return orderItems.some(
      (orderItem: any) => orderItem._id?.toString() === product._id?.toString()
    );
  });

  if (!checkAllProductsInDb) {
    throw createError.createError(404, "Product Not Found", "Not Found");
  }
  const checkAllProductsInStock = productsDB.every((product: any) => {
    return orderItems.some(
      (orderItem: any) =>
        orderItem._id?.toString() === product._id?.toString() &&
        product.countInStock >= orderItem.countPices
    );
  });
  if (!checkAllProductsInStock) {
    throw createError.createError(404, "Product Not In Stock", "Not Found");
  }
  const { totalPrice, shippingPrice, taxPrice, totalPriceItems } =
    calcPriceOfProducts(orderItems);

  orderItems = orderItems.map((item: any) => {
    return {
      product: item._id,
      name: item.name,
      image: item.image,
      price: item.price,

      qty: item.countPices,
    };
  });
  console.log(orderItems);
  const order = await Order.create({
    orderItems,
    shippingAddress,
    paymentMethod,
    user: user._id,
    totalPrice,
    itemsPrice: totalPriceItems,
    shippingPrice,
    taxPrice,
  });
  res.status(201).json({
    success: true,
    message: "Order Created Successfully",
    data: order,
  });
});

const getAllOrders = asyncHandler(async (req: any, res: Response) => {
  const orders = await Order.find({}).populate("user", "username email _id");
  const totalOrders = await Order.find({}).countDocuments();
  res.status(200).json({
    success: true,
    message: "Orders Found",
    data: orders,
    totalOrders,
  });
});
const getUserOrders = asyncHandler(async (req: any, res: Response) => {
  const orders = await Order.find({ user: req.user._id });
  const totalOrders = await Order.find({ user: req.user._id }).countDocuments();
  res.status(200).json({
    success: true,
    message: "Orders Found",
    data: orders,
    totalOrders,
  });
});
const getTotalSales = asyncHandler(async (req: any, res: Response) => {
  const totalSales = await Order.aggregate([
    {
      $match: {
        isPiad: true,
      },
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$itemsPrice" },
      },
    },
  ]);
  res.status(200).json({
    success: true,
    message: "Total Sales Found",
    data: totalSales,
  });
});
const getTotalSalesDated = asyncHandler(async (req: any, res: Response) => {
  const totalSales = await Order.aggregate([
    {
      $match: {
        isPiad: true,
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$paidAt" } },
        totalSales: { $sum: "$itemsPrice" },
      },
    },
  ]);
  res.status(200).json({
    success: true,
    message: "Total Sales Found",
    data: totalSales,
  });
});
const getSpecificOrder = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("user", "username email _id");
  if (!order) {
    throw createError.createError(404, "Order Not Found", "Not Found");
  }
  res.status(200).json({
    success: true,
    message: "Order Found",
    data: order,
  });
});
const makeOrderPaid = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) {
    throw createError.createError(404, "Order Not Found", "Not Found");
  }
  order.isPaid = true;
  order.paidAt = new Date();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address,
  };
  const updatedOrder = await order.save();
  console.log(updatedOrder);
  res.status(200).json({
    success: true,
    message: "Order Paid Successfully",
    data: updatedOrder,
  });
});
const makeOrderdelivered = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) {
    throw createError.createError(404, "Order Not Found", "Not Found");
  }
  order.isDelivered = true;
  order.deliveredAt = new Date();
  const updatedOrder = await order.save();
  res.status(200).json({
    success: true,
    message: "Order Delivered Successfully",
    data: updatedOrder,
  });
});
export {
  createOrder,
  getAllOrders,
  getUserOrders,
  getTotalSales,
  getTotalSalesDated,
  getSpecificOrder,
  makeOrderPaid,
  makeOrderdelivered,
};
