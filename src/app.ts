import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Server running" });
});

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

export default app;
