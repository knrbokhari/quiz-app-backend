import { Router, Express } from "express";
import {
  createResource,
  deleteResource,
  getAllResources,
  getResourceBySlug,
  updateResource,
} from "../controllers/resourceController";
import authenticateRequest from "../middlewares/authenticate";

const router = Router();

router.get("/", authenticateRequest, getAllResources);
router.get("/:slug", authenticateRequest, getResourceBySlug);
router.post("/create", authenticateRequest, createResource);
router.put("/update/:slug", authenticateRequest, updateResource);
router.delete("/delete/:id", authenticateRequest, deleteResource);

const resourceRoutesConfigure = (app: Express) => {
  app.use("/api/resource", router);
};

export default resourceRoutesConfigure;
