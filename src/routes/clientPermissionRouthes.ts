import { Router, Express } from "express";

const router = Router();

router.get("/");
router.get("/:slug");
router.post("/create");
router.put("/update/:slug");
router.delete("/delete");

const clientPermissionRoutesConfigure = (app: Express) => {
  app.use("/api/client-permission", router);
};

export default clientPermissionRoutesConfigure;
