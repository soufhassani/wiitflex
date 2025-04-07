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
  // const [errorMsg, setErrorMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });
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
    setErrorMsg({ username: "", email: "", password: "", fullName: "" });
  };

  useEffect(() => {
    console.log(errors);
    console.log(isError);
    if (errors.username) {
      console.log("username error: ", errors.username.message);
      setIsError((state) => ({ ...state, username: true }));
      setErrorMsg((state) => ({
        ...state,
        username: errors.username ? errors.username!.message! : "",
      }));
    }
    if (errors.email) {
      console.log("email error: ", errors.email.message);
      setIsError((state) => ({ ...state, email: true }));
      setErrorMsg((state) => ({
        ...state,
        email: errors.email ? errors.email!.message! : "",
      }));
    }
    if (errors.password) {
      console.log("password error: ", errors.password.message);
      setIsError((state) => ({ ...state, password: true }));
      setErrorMsg((state) => ({
        ...state,
        password: errors.password ? errors.password!.message! : "",
      }));
    }
    if (errors.fullName) {
      console.log("fullName error: ", errors.fullName.message);
      setIsError((state) => ({ ...state, fullName: true }));
      setErrorMsg((state) => ({
        ...state,
        fullName: errors.fullName ? errors.fullName!.message! : "",
      }));
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
      if (err.name === "username") {
        setIsError({ ...isError, username: true });
        setErrorMsg((state) => ({ ...state, username: err.message }));
      } else if (err.name === "fullname") {
        setIsError({ ...isError, fullName: true });
        setErrorMsg((state) => ({ ...state, fullName: err.message }));
      } else if (err.name === "email") {
        setIsError({ ...isError, email: true });
        setErrorMsg((state) => ({ ...state, email: err.message }));
      } else if (err.name === "password") {
        setIsError({ ...isError, password: true });
        setErrorMsg((state) => ({ ...state, password: err.message }));
      }

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
          isError={isError.username}
          errorMsg={errorMsg.username}
          {...register("username")}
        />
      </div>
      <div className="flex flex-col gap-3 font-main">
        <Input
          label="Full name"
          id="fullname"
          type="text"
          isError={isError.fullName}
          errorMsg={errorMsg.fullName}
          {...register("fullName")}
        />
      </div>
      <div className="flex flex-col gap-3 font-main">
        <Input
          label="E-mail"
          id="email"
          type="text"
          isError={isError.email}
          errorMsg={errorMsg.email}
          {...register("email")}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Input
          label="Password"
          id="password"
          type="password"
          isError={isError.password}
          errorMsg={errorMsg.password}
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
