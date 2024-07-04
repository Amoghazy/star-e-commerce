import express from "express";
import {
  createUsers,
  loginUser,
  logoutUser,
} from "../controllers/userController";
const router = express.Router();

router.route("/").post(createUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);
export default router;
