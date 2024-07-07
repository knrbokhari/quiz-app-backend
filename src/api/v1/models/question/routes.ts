import express from "express";
// // Import controller method for this route
import { authentication } from "../../../../middlewares";
import { createQuestion, getQuestion } from "./questionController";

// Initialize express router
const router = express.Router();

// Routes handler
router.route("/create").post(authentication, createQuestion);
router.route("/:moduleId").get(authentication, getQuestion);

// Configuring and exporting all routes
const questionRoutesConfigure = (app: any) => {
  app.use("/api/question", router);
};

export default questionRoutesConfigure;
