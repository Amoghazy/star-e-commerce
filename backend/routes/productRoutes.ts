import express from "express";
import {
  addProductReview,
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  getTopProducts,
  getNewProducts,
} from "../controllers/productController";
import { authonticate, authorizeAdmin } from "../middlewares/authMiddelware";
import upload from "../middlewares/uploadMiddelware";
import checkValidId from "../middlewares/checkValidId";

const router = express.Router();

router
  .route("/")
  .post(authonticate, authorizeAdmin, upload.single("image"), createProduct)
  .get(getAllProducts);
router.get("/top", getTopProducts);
router.get("/new", getNewProducts);

router.post("/:id/review", authonticate, addProductReview);
router
  .route("/:id")
  .delete(authonticate, authorizeAdmin, checkValidId, deleteProduct)
  .get(checkValidId, getProductById)
  .put(
    authonticate,
    authorizeAdmin,
    checkValidId,
    upload.single("image"),
    updateProduct
  );

export default router;