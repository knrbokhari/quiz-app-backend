import { Router, Express } from "express";
import {
  findAllCatagory,
  findCatagoryBySlug,
} from "../controllers/categoryController";

const router = Router();

router.get("/", findAllCatagory);
router.get("/:slug", findCatagoryBySlug);
router.post("/create");
router.put("/update/:slug");
router.delete("/delete");

const categoryRoutesConfigure = (app: Express) => {
  app.use("/api/category", router);
};

export default categoryRoutesConfigure;
