import { Router, Express } from "express";

const router = Router();

router.get("/");
router.get("/:slug");
router.post("/create");
router.put("/update/:slug");
router.delete("/delete");

const categoryRoutesConfigure = (app: Express) => {
  app.use("/api/category", router);
};

export default categoryRoutesConfigure;
