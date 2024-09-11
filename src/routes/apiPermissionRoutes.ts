import { Router, Express } from "express";
import authenticateRequest from "../middlewares/authenticate";
import {
  createPermission,
  deletePermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
} from "../controllers/apiPermissionController";

const router = Router();

router.get("/", authenticateRequest, getAllPermissions);
router.get("/:id", authenticateRequest, getPermissionById);
router.post("/create", authenticateRequest, createPermission);
router.put("/update/:id", authenticateRequest, updatePermission);
router.delete("/delete/:id", authenticateRequest, deletePermission);

const apiPermissionRoutesConfigure = (app: Express) => {
  app.use("/api/api-permission", router);
};

export default apiPermissionRoutesConfigure;
