import express from "express";
import {
  checkAuth,
  login,
  signup,
  verfiyEmail,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verifyEmail", verfiyEmail);
router.post("/checkToken", protectRoute, checkAuth);

export default router;
