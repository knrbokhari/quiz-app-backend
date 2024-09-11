import { Router, Express } from "express";
import { findAllCatagory } from "../controllers/categoryController";

const router = Router();

router.get("/", findAllCatagory);
router.get("/:slug");
router.post("/create");
router.put("/update/:slug");
router.delete("/delete");

const categoryRoutesConfigure = (app: Express) => {
  app.use("/api/category", router);
};

export default categoryRoutesConfigure;
