import express from "express";
import { authonticate, authorizeAdmin } from "../middlewares/authMiddelware";
import {
  createOrder,
  getAllOrders,
  getSpecificOrder,
  getTotalSales,
  getTotalSalesDated,
  getUserOrders,
  makeOrderPaid,
  makeOrderdelivered,
} from "../controllers/orderController";
import checkValidId from "../middlewares/checkValidId";
const router = express.Router();

router
  .route("/")
  .post(authonticate, createOrder)
  .get(authonticate, authorizeAdmin, getAllOrders);
router.get("/total-sales", authonticate, authorizeAdmin, getTotalSales);
router.get(
  "/total-sales-dated",
  authonticate,
  authorizeAdmin,
  getTotalSalesDated
);
router.get("/:id", checkValidId, authonticate, getSpecificOrder);
router.put("/:id/paid", checkValidId, authonticate, makeOrderPaid);
router.put("/:id/delivered", checkValidId, authonticate, makeOrderdelivered);
router.get("/my-orders", authonticate, getUserOrders);

export default router;
