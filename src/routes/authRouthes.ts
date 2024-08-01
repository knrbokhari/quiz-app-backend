import { Router, Express } from "express";

const router = Router();

router.get("/me");
router.post("/login");
router.post("/register");
router.get("/verify/:registerToken");
router.put("/update");
router.post("/forgot-password");
router.post("/reset-password/:token");
router.post("/change-password");

const authRoutesConfigure = (app: Express) => {
  app.use("/api/auth", router);
};

export default authRoutesConfigure;
