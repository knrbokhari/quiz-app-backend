import { Router, Express } from "express";
import authenticateRequest from "../middlewares/authenticate";
import {
  createClientResource,
  deleteClientResource,
  getAllClientResources,
  getClientResourceBySlug,
  updateClientResource,
} from "../controllers/clientResourceController";

const router = Router();

router.get("/", authenticateRequest, getAllClientResources);
router.get("/:slug", authenticateRequest, getClientResourceBySlug);
router.post("/create", authenticateRequest, createClientResource);
router.put("/update/:slug", authenticateRequest, updateClientResource);
router.delete("/delete/:id", authenticateRequest, deleteClientResource);

const resourceRoutesConfigure = (app: Express) => {
  app.use("/api/client-resource", router);
};

export default resourceRoutesConfigure;
