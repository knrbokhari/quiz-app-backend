import { Router, Express } from "express";
import {
  changePassword,
  forgotPassword,
  login,
  registration,
  resend,
  resetPassword,
  verifyForgotRequestOtp,
  verifyOtp,
} from "../controllers/authController";
import authenticateRequest from "../middlewares/authenticate";

const router = Router();

router.post("/login", login);
router.post("/register", registration);
router.get("/verify", verifyOtp);
router.post("/resend", resend);
router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-request-otp", verifyForgotRequestOtp);
router.post("/reset-password/:token", resetPassword);
router.post("/change-password", authenticateRequest, changePassword);

const authRoutesConfigure = (app: Express) => {
  app.use("/api/auth", router);
};

export default authRoutesConfigure;
