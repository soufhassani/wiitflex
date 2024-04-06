import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { FormData, schema } from "../schema/signupSchema";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/global/Spinner";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onSubmit", resolver: zodResolver(schema) });
  const [isError, setIsError] = useState({
    username: false,
    email: false,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const onSubmit = async (data: FormData) => {
    setIsDisabled(true);
    setIsLoading(true);

    const formData = {
      fullName: data.fullName,
      username: data.username,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await signup(formData);
      console.log(res);
      setIsError({ email: false, username: false });
      setIsDisabled(false);
      setIsLoading(false);
    } catch (error) {
      const err = error as Error;
      if (err.name === "username") setIsError({ ...isError, username: true });
      else setIsError({ ...isError, email: true });
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
              Sign-up
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-slate-50 font-main" htmlFor="username">
              Username
            </label>
            <input
              {...register("username")}
              className={`input ${
                errors.username
                  ? "border-red-500 border-2"
                  : isError.username
                  ? "border-red-500 border-2"
                  : ""
              }`}
              id="username"
              type="text"
            />
            {errors.username && (
              <p className="field-error">{errors.username.message}</p>
            )}
            {isError.username && <p className="field-error">{errorMsg}</p>}
          </div>
          <div className="flex flex-col gap-3 font-main">
            <label className="text-slate-50 font-main" htmlFor="fullname">
              Full name
            </label>
            <input
              {...register("fullName")}
              className={`input
                ${errors.fullName && "border-red-500 border-2"}`}
              id="fullname"
              type="text"
            />
            {errors.fullName && (
              <p className="field-error">{errors.fullName.message}</p>
            )}
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
          </div>

          <div className="mt-5 pr-2 flex items-center justify-between ">
            <button
              disabled={isDisabled}
              className="flex items-center justify-center gap-2 py-3 px-10 bg-red-500 rounded-full text-slate-50 font-main font-semibold hover:bg-red-600"
              type="submit"
            >
              {isLoading ? <Spinner text="Processing..." /> : "Sign-in"}
            </button>
            <h4>
              Already have an account ?{" "}
              <Link
                className="text-red-300 hover:text-red-400 transition-colors"
                to="/"
              >
                Log-in
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

export default Signup;
