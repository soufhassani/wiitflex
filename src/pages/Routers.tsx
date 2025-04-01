import { RouterProvider } from "react-router-dom";
import { routes } from "../routes";

const Routers = () => {
  // const { isLoggedin } = useAuth();
  // isLoggedin();
  // const isLogged = useAuthQuery((s) => s.isLoggedin);

  // const router = isLogged ? signingInRouter : signingOutRouter;

  return <RouterProvider router={routes} />;
};

export default Routers;
