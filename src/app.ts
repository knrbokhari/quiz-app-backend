import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { errorHandler } from "./middlewares/errorHandler";
import configure from "./routes";

dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

configure(app);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Server running" });
});

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

export default app;
