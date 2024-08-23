import { Router, Express } from "express";

const router = Router();

router.get("/");
router.get("/:slug");
router.post("/create");
router.put("/update/:slug");
router.delete("/delete");

const apiPermissionRoutesConfigure = (app: Express) => {
  app.use("/api/api-permission", router);
};

export default apiPermissionRoutesConfigure;
