import { RouterProvider } from "react-router-dom";
import { signingInRouter, signingOutRouter } from "../routes";
import useAuthQuery from "../store/authStore";
import useAuth from "../hooks/useAuth";

const Routers = () => {
  const { isLoggedin } = useAuth();
  isLoggedin();
  const isLogged = useAuthQuery((s) => s.isLoggedin);

  return (
    <RouterProvider router={isLogged ? signingInRouter : signingOutRouter} />
  );
};

export default Routers;
