import express from "express";
import { createUsers } from "../controllers/userController";
const router = express.Router();


router.route("/").post(createUsers);
export default router;
