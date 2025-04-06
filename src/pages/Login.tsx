import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthQuery from "../store/authStore";
import NormalRoutes from "../components/global/NormalRoutes";
import LoginForm from "../components/forms/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const isLogged = useAuthQuery((s) => s.isLogged);
  useLayoutEffect(() => {
    if (isLogged) navigate("/", { replace: true });
  }, [isLogged]);

  return (
    <NormalRoutes>
      <section className="relative">
        <div className="absolute top-0 left-0 z-[-1] w-full h-full">
          <img
            src="/login-wallpaper.jpg"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full z-[1]  bg-[rgba(0,0,0,0.7)] "></div>
        </div>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-0">
          <LoginForm />
          <div className="mt-10">
            <p>
              <b>Note:</b> Your data will be save for 30days
            </p>
          </div>
        </div>
      </section>
    </NormalRoutes>
  );
};

export default Login;
