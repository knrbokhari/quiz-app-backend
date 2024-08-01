import { Express } from "express";
import authRoutesConfigure from "./authRouthes";

const configure = (app: Express) => {
  authRoutesConfigure(app);
};

export default configure;
