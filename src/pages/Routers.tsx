import { RouterProvider } from "react-router-dom";
import { signingInRouter, signingOutRouter } from "../routes";
import useAuthQuery from "../store/authStore";
import useAuth from "../hooks/useAuth";

const Routers = () => {
  const { isLoggedin } = useAuth();
  isLoggedin();
  const isLogged = useAuthQuery((s) => s.isLoggedin);

  const router = isLogged ? signingInRouter : signingOutRouter;

  return <RouterProvider router={router} />;
};

export default Routers;
