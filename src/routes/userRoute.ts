import { Router, Express } from "express";
import authenticateRequest from "../middlewares/authenticate";
import {
  getUserInfo,
  userUpdateProfileInfo,
} from "../controllers/userController";

const router = Router();

router.get("/me", authenticateRequest, getUserInfo);
router.put("/update", authenticateRequest, userUpdateProfileInfo);

const userRoutesConfigure = (app: Express) => {
  app.use("/api/user", router);
};

export default userRoutesConfigure;
