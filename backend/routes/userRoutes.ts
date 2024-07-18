import express from "express";
import {
  createUsers,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteSpecificUser,
  getUserById,
  updateUserById,
  getNewUsers,
} from "../controllers/userController";
import { authonticate, authorizeAdmin } from "../middlewares/authMiddelware";
const router = express.Router();

router
  .route("/")
  .post(createUsers)
  .get(authonticate, authorizeAdmin, getAllUsers);
router.get("/new-users", authonticate, authorizeAdmin, getNewUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(authonticate, getCurrentUserProfile)
  .put(authonticate, updateCurrentUserProfile);

router
  .route("/:id")
  .delete(authonticate, authorizeAdmin, deleteSpecificUser)
  .get(authonticate, authorizeAdmin, getUserById)
  .put(authonticate, authorizeAdmin, updateUserById);

export default router;
