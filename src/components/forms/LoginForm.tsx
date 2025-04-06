import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAuthQuery from "../../store/authStore";
import { useForm } from "react-hook-form";
import { FormData, schema } from "../../schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import FormButton from "./FormButton";
import FormTitle from "./FormTitle";
import Input from "./Input";

const LoginForm = () => {
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
  const setIsLogged = useAuthQuery((s) => s.setIsLogged);

  const navigate = useNavigate();

  useEffect(() => {
    if (errors.email) {
      setIsError({ email: true, password: false });
      setErrorMsg(errors.email.message!);
    } else if (errors.password) {
      setIsError({ email: false, password: true });
      setErrorMsg(errors.password.message!);
    }
  }, [errors.email, errors.password]);

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
      navigate("/", { replace: true });
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[500px] w-full flex flex-col gap-5 bg-neutral-950 p-8 rounded-3xl shadow-2xl"
    >
      <FormTitle title="Login" />

      <div className="flex flex-col gap-3 font-main">
        <Input
          id="email"
          label="E-mail"
          type="email"
          isError={isError.email}
          errorMsg={isError.email ? errorMsg : ""}
          {...register("email")}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Input
          id="password"
          label="Password"
          type="password"
          isError={isError.password}
          errorMsg={isError.password ? errorMsg : ""}
          {...register("password")}
        />
      </div>

      <div className="mt-5 pr-2 flex flex-col-reverse gap-3 items-center md:justify-between md:flex-row">
        <h4>
          Don't have an account ?{" "}
          <Link
            className="text-blue-300 hover:text-blue-400 transition-colors"
            to="/sign-up"
          >
            Sign-up
          </Link>
        </h4>
        <FormButton
          label="Login"
          isDisabled={isDisabled}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

export default LoginForm;
