import express from "express";
// // Import controller method for this route
import { authentication } from "../../../../middlewares";
import { createQuestion, getQuestion } from "./questionController";

// Initialize express router
const router = express.Router();

// Routes handler
router.route("/create").post(createQuestion);
router.route("/:moduleId").get(getQuestion);

// Configuring and exporting all routes
const questionRoutesConfigure = (app: any) => {
  app.use("/api/v1/question", router);
};

export default questionRoutesConfigure;
