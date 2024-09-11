import { Router, Express } from "express";
import {
  CreateCategory,
  DeleteCategory,
  findAllCategory,
  findCategoryBySlug,
  UpdateCategory,
} from "../controllers/categoryController";
import authenticateRequest from "../middlewares/authenticate";

const router = Router();

router.get("/", findAllCategory);
router.get("/:slug", findCategoryBySlug);
router.post("/create", authenticateRequest, CreateCategory);
router.put("/update/:id", authenticateRequest, UpdateCategory);
router.delete("/delete/:id", authenticateRequest, DeleteCategory);

const categoryRoutesConfigure = (app: Express) => {
  app.use("/api/category", router);
};

export default categoryRoutesConfigure;
