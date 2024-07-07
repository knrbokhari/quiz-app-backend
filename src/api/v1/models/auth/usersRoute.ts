import express from "express";
// // Import controller method for this route

import { authentication } from "../../../../middlewares";
import {
  changePassword,
  currentUser,
  forgotPassword,
  login,
  register,
  resetPassword,
  updateUser,
  verifyUser,
} from "./usersControllers";

// Initialize express router
const router = express.Router();

// Routes handler
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/verify/:registerToken").get(verifyUser);
router.route("/me").get(authentication, currentUser);
router.route("/update").put(authentication, updateUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/change-password").post(authentication, changePassword);

// Configuring and exporting all routes
const usersRoutesConfigure = (app: any) => {
  app.use("/api/v1/users", router);
};

export default usersRoutesConfigure;
