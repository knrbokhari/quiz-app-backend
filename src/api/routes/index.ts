import usersRoutesConfigure from "../v1/models/auth/usersRoute";

const configure = (app: any) => {
  usersRoutesConfigure(app);
};

export default configure;
