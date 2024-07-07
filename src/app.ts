import express from "express";
// import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

// import * as middlewares from "./middlewares/middlewares";
import configure from "./api/routes";
import MessageResponse from "./interfaces/MessageResponse";
import handleError from "./middlewares/handleError";

require("dotenv").config();

const app = express();

// app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>("/", (req, res) => {
  res.status(200).json({
    message: "server working",
  });
});

configure(app);

// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

app.use(handleError);

app.all("*", (req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

export default app;
