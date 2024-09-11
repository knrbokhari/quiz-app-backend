import { Express } from "express";
import authRoutesConfigure from "./authRoutes";
import roleRoutesConfigure from "./roleRoutes";
import resourceRoutesConfigure from "./resourceRoutes";
import apiPermissionRoutesConfigure from "./apiPermissionRoutes";
import clientPermissionRoutesConfigure from "./clientPermissionRoutes";
import categoryRoutesConfigure from "./categoryRoutes";
import userRoutesConfigure from "./userRoute";
import clientResourceRoutesConfigure from "./clientResourceRoutes";

const configure = (app: Express) => {
  userRoutesConfigure(app);
  authRoutesConfigure(app);
  categoryRoutesConfigure(app);
  roleRoutesConfigure(app);
  resourceRoutesConfigure(app);
  clientResourceRoutesConfigure(app);
  apiPermissionRoutesConfigure(app);
  clientPermissionRoutesConfigure(app);
};

export default configure;
