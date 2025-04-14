import { PropsWithChildren, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAuthQuery from "../../store/authStore";

type Props = PropsWithChildren;

const ProtectedRoutes = ({ children }: Props) => {
  const { isLoggedin } = useAuth();
  const navigate = useNavigate();
  const isLogged = useAuthQuery((s) => s.isLogged);
  useLayoutEffect(() => {
    isLoggedin();
    if (!isLogged) navigate("/login", { replace: true });
  }, [isLogged]);
  return children;
};

export default ProtectedRoutes;
