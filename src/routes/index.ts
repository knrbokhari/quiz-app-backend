import { Express } from "express";
import authRoutesConfigure from "./authRouthes";
import roleRoutesConfigure from "./roleRouthes";
import resourceRoutesConfigure from "./resourceRouthes";
import apiPermissionRoutesConfigure from "./apiPermissionRouthes";
import clientPermissionRoutesConfigure from "./clientPermissionRouthes";
import categoryRoutesConfigure from "./categoryRouthes";

const configure = (app: Express) => {
  authRoutesConfigure(app);
  categoryRoutesConfigure(app);
  roleRoutesConfigure(app);
  resourceRoutesConfigure(app);
  apiPermissionRoutesConfigure(app);
  clientPermissionRoutesConfigure(app);
};

export default configure;
