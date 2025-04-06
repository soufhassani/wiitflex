import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  const [isError, setIsError] = useState({
    username: false,
    email: false,
    password: false,
    fullName: false,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setIsLogged = useAuthQuery((s) => s.setIsLogged);
  const navigate = useNavigate();

  const { signup, login } = useAuth();

  const resetIsError = () => {
    setIsError({
      email: false,
      password: false,
      username: false,
      fullName: false,
    });
    setErrorMsg("");
  };

  useEffect(() => {
    console.log(errors);
    console.log(isError);
    console.log(errorMsg);
    if (errors.email) {
      setIsError((state) => ({ ...state, email: true }));
      setErrorMsg(errors.email.message!);
    } else if (errors.password) {
      setIsError((state) => ({ ...state, password: true }));
      setErrorMsg(errors.password.message!);
    } else if (errors.username) {
      setIsError((state) => ({ ...state, username: true }));
      setErrorMsg(errors.username.message!);
    } else if (errors.fullName) {
      setIsError((state) => ({ ...state, fullName: true }));
      setErrorMsg(errors.fullName.message!);
    }
  }, [errors.email, errors.password, errors.username, errors.fullName]);

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
      await signup(formData);
      await login(formData);
      resetIsError();
      setIsLogged(true);
      setIsLoading(false);
      navigate("/", { replace: true });
    } catch (error) {
      const err = error as Error;
      console.log("error: ", err);
      if (err.name === "username") setIsError({ ...isError, username: true });
      else if (err.name === "fullname")
        setIsError({ ...isError, fullName: true });
      else if (err.name === "email") setIsError({ ...isError, email: true });
      else if (err.name === "password")
        setIsError({ ...isError, password: true });

      setErrorMsg(err.message);
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

      <div className="flex flex-col gap-3">
        <Input
          label="Username"
          id="username"
          type="text"
          isError={isError.username}
          errorMsg={errorMsg}
          {...register("username")}
        />
      </div>
      <div className="flex flex-col gap-3 font-main">
        <Input
          label="Full name"
          id="fullname"
          type="text"
          isError={isError.fullName}
          errorMsg={errorMsg}
          {...register("fullName")}
        />
      </div>
      <div className="flex flex-col gap-3 font-main">
        <Input
          label="E-mail"
          id="email"
          type="text"
          isError={isError.email}
          errorMsg={errorMsg}
          {...register("email")}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Input
          label="Password"
          id="password"
          type="password"
          isError={isError.password}
          errorMsg={errorMsg}
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
    </form>
  );
};

export default SignupForm;
