import { Router, Express } from "express";
import authenticateRequest from "../middlewares/authenticate";
import {
  findAllUsers,
  getUserInfo,
  userUpdateProfileInfo,
} from "../controllers/userController";

const router = Router();

router.get("/me", authenticateRequest, getUserInfo);
router.put("/update", authenticateRequest, userUpdateProfileInfo);
router.get("/all", authenticateRequest, findAllUsers);

const userRoutesConfigure = (app: Express) => {
  app.use("/api/user", router);
};

export default userRoutesConfigure;
