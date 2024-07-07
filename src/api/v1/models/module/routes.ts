import express from "express";

// Initialize express router
import { authentication } from "../../../../middlewares";
import { createModule, getModule, getSingleModule } from "./moduleController";

const router = express.Router();

// Routes handler
router.route("/create").post(authentication, createModule);
router.route("/").get(authentication, getModule);
router.route("/:moduleId").get(authentication, getSingleModule);

// Configuring and exporting all routes
const moduleRoutesConfigure = (app: any) => {
  app.use("/api/module", router);
};

export default moduleRoutesConfigure;
