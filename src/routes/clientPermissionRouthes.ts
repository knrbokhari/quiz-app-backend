import { Router, Express } from "express";
import authenticateRequest from "../middlewares/authenticate";
import {
  createClientPermissionController,
  deleteClientPermissionController,
  getAllClientPermissions,
  getClientPermissionById,
  updateClientPermissionController,
} from "../controllers/clientPermissionController";

const router = Router();

router.get("/", authenticateRequest, getAllClientPermissions);
router.get("/:slug", authenticateRequest, getClientPermissionById);
router.post("/create", authenticateRequest, createClientPermissionController);
router.put(
  "/update/:slug",
  authenticateRequest,
  updateClientPermissionController,
);
router.delete("/delete", authenticateRequest, deleteClientPermissionController);

const clientPermissionRoutesConfigure = (app: Express) => {
  app.use("/api/client-permission", router);
};

export default clientPermissionRoutesConfigure;
