import express from "express";
import {
  createUsers,
  loginUser,
  logoutUser,getAllUsers
} from "../controllers/userController";
import { authonticate, authorizeAdmin } from "../middlewares/authMiddelware";
const router = express.Router();

router.route("/").post(createUsers).get(authonticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);
export default router;
