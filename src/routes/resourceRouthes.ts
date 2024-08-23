import { Router, Express } from "express";

const router = Router();

router.get("/");
router.get("/:slug");
router.post("/create");
router.put("/update/:slug");
router.delete("/delete");

const resourceRoutesConfigure = (app: Express) => {
  app.use("/api/resource", router);
};

export default resourceRoutesConfigure;
