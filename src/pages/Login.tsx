import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Spinner from "../components/global/Spinner";
import useAuth from "../hooks/useAuth";
import { FormData, schema } from "../schema/loginSchema";
import useAuthQuery from "../store/authStore";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onSubmit", resolver: zodResolver(schema) });
  const [isError, setIsError] = useState({
    password: false,
    email: false,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const setIsLogged = useAuthQuery((s) => s.setIsLoggedin);

  const onSubmit = async (data: FormData) => {
    setIsDisabled(true);
    setIsLoading(true);

    const formData = {
      email: data.email,
      password: data.password,
    };
    try {
      await login(formData);
      setIsError({ email: false, password: false });
      setIsLogged(true);
    } catch (error) {
      const err = error as Error;
      if (err.name === "password") setIsError({ email: false, password: true });
      else setIsError({ password: false, email: true });
      setErrorMsg(err.message);
      setIsDisabled(false);
      setIsLoading(false);
    }
  };
  return (
    <section className="relative">
      <div className="absolute top-0 left-0 z-[-1] w-full h-full">
        <img
          src="/login-wallpaper.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full z-[1]  bg-[rgba(0,0,0,0.7)] "></div>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[500px] w-full flex flex-col gap-5 bg-neutral-950 p-5 rounded-3xl shadow-2xl"
        >
          <div>
            <h2 className="text-slate-50 font-main text-4xl font-semibold">
              Login
            </h2>
          </div>

          <div className="flex flex-col gap-3 font-main">
            <label className="text-slate-50 font-main" htmlFor="email">
              E-mail
            </label>
            <input
              {...register("email")}
              className={`input
                  ${
                    errors.email
                      ? "border-red-500 border-2"
                      : isError.email
                      ? "border-red-500 border-2"
                      : ""
                  }`}
              id="email"
              type="text"
            />
            {errors.email && (
              <p className="field-error">{errors.email.message}</p>
            )}
            {isError.email && <p className="field-error">{errorMsg}</p>}
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-slate-50 font-main" htmlFor="password">
              Password
            </label>
            <input
              {...register("password")}
              className={`input ${
                errors.password && "border-red-500 border-2"
              }`}
              id="password"
              type="password"
            />
            {errors.password && (
              <p className="field-error">{errors.password.message}</p>
            )}
            {isError.password && <p className="field-error">{errorMsg}</p>}
          </div>

          <div className="mt-5 pr-2 flex items-center justify-between ">
            <button
              disabled={isDisabled}
              className="flex items-center justify-center gap-2 py-3 px-10 bg-red-500 rounded-full text-slate-50 font-main font-semibold hover:bg-red-600"
              type="submit"
            >
              {isLoading ? <Spinner text="Processing..." /> : "Login"}
            </button>
            <h4>
              Don't have an account ?{" "}
              <Link
                className="text-red-300 hover:text-red-400 transition-colors"
                to="/sign-up"
              >
                Sign-up
              </Link>
            </h4>
          </div>
          <div>
            <p>
              <b>Note:</b> Your data will be save for 30days
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
