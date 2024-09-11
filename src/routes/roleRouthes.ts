import { Router, Express } from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  getRoleBySlug,
  updateRole,
} from "../controllers/roleController";
import authenticateRequest from "../middlewares/authenticate";

const router = Router();

router.get("/", authenticateRequest, getAllRoles);
router.get("/:slug", authenticateRequest, getRoleBySlug);
router.post("/create", authenticateRequest, createRole);
router.put("/update/:slug", authenticateRequest, updateRole);
router.delete("/delete", authenticateRequest, deleteRole);

const roleRoutesConfigure = (app: Express) => {
  app.use("/api/roles", router);
};

export default roleRoutesConfigure;
