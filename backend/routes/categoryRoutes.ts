import expresss from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategories,
  getCategory,
} from "../controllers/categoryController";
import { authonticate, authorizeAdmin } from "../middlewares/authMiddelware";

const router = expresss.Router();

router.post("/", authonticate, authorizeAdmin, createCategory);
router.get("/categories", listCategories);
router
  .route("/:id")
  .put(authonticate, authorizeAdmin, updateCategory)
  .delete(authonticate, authorizeAdmin, deleteCategory)
  .get(getCategory);

export default router;
