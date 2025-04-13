import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, schema } from "../../schema/signupSchema";
import FormButton from "./FormButton";
import useAuth from "../../hooks/useAuth";
import useAuthQuery from "../../store/authStore";
import FormTitle from "./FormTitle";
import Input from "./Input";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onSubmit", resolver: zodResolver(schema) });

  // const [errorMsg, setErrorMsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setIsLogged = useAuthQuery((s) => s.setIsLogged);
  const navigate = useNavigate();

  const { signup, login } = useAuth();

  const onSubmit = async (data: FormData) => {
    setIsDisabled(true);
    setIsLoading(true);

    const formData = {
      fullName: data.fullname,
      username: data.username,
      email: data.email,
      password: data.password,
    };
    try {
      await signup(formData);
      await login(formData);
      toast.success("Successfully registered", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsLogged(true);
      setIsLoading(false);
      navigate("/", { replace: true });
    } catch (error) {
      // const err = error as Error;

      toast.error("An error has been occurred, please try back later.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // setErrorMsg(err.message);
      setIsDisabled(false);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[500px] w-full flex flex-col gap-5 bg-neutral-950 p-5 rounded-3xl shadow-2xl"
    >
      <FormTitle title="Sign-up" />

      <div className="flex flex-col gap-3 font-main">
        <Input
          label="Username"
          id="username"
          type="text"
          errors={errors}
          {...register("username")}
        />
      </div>
      <div className="flex flex-col gap-3 font-main">
        <Input
          label="Full name"
          id="fullname"
          type="text"
          errors={errors}
          {...register("fullname")}
        />
      </div>
      <div className="flex flex-col gap-3 font-main">
        <Input
          label="E-mail"
          id="email"
          type="text"
          errors={errors}
          {...register("email")}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Input
          label="Password"
          id="password"
          type="password"
          errors={errors}
          {...register("password")}
        />
      </div>

      <div className="mt-5 pr-2 flex flex-col-reverse gap-3 items-center md:justify-between md:flex-row">
        <h4>
          Already have an account ?{" "}
          <Link
            className="text-blue-300 hover:text-blue-400 transition-colors"
            to="/login"
          >
            Log-in
          </Link>
        </h4>
        <FormButton
          label="Sign-up"
          isDisabled={isDisabled}
          isLoading={isLoading}
        />
      </div>
      <ToastContainer />
    </form>
  );
};

export default SignupForm;
