import { PropsWithChildren, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAuthQuery from "../../store/authStore";

type Props = PropsWithChildren;

const NormalRoutes = ({ children }: Props) => {
  const { isLoggedin } = useAuth();
  isLoggedin();
  const navigate = useNavigate();
  const isLogged = useAuthQuery((s) => s.isLogged);

  useLayoutEffect(() => {
    if (isLogged) navigate("/", { replace: true });
  }, [isLogged]);
  return children;
};

export default NormalRoutes;
