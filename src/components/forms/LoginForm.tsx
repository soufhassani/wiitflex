import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import { FormData, schema } from "../../schema/loginSchema";
import useAuthQuery from "../../store/authStore";
import useAuth from "../../hooks/useAuth";
import FormButton from "./FormButton";
import FormTitle from "./FormTitle";
import Input from "./Input";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onSubmit", resolver: zodResolver(schema) });

  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const setIsLogged = useAuthQuery((s) => s.setIsLogged);

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setIsDisabled(true);
    setIsLoading(true);

    const formData = {
      email: data.email,
      password: data.password,
    };
    try {
      await login(formData);
      setIsLogged(true);

      navigate("/", { replace: true });
    } catch (error) {
      const err = error as Error;
      toast.error(err.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
          errors={errors}
          {...register("email")}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Input
          id="password"
          label="Password"
          type="password"
          errors={errors}
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
      <ToastContainer />
    </form>
  );
};

export default LoginForm;
