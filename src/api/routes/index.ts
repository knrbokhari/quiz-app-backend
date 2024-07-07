import usersRoutesConfigure from "../v1/models/auth/usersRoute";
import moduleRoutesConfigure from "../v1/models/module/routes";
import questionRoutesConfigure from "../v1/models/question/routes";

const configure = (app: any) => {
  usersRoutesConfigure(app);
  questionRoutesConfigure(app);
  moduleRoutesConfigure(app);
};

export default configure;
