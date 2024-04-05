import React, { ReactNode, createContext, useState } from "react";
import User from "../entities/User";
import { getCookie, setCookie } from "../utils/cookies";
import { redirect } from "react-router-dom";
import tokenProvider from "../utils/tokenProvider";

type Props = {
  children: ReactNode;
};
type ContextType = {
  auth: User;
  login: (email: string, password: string) => void;
  signup: (signupProps: SignupUser) => void;
  logout: () => void;
};
type SignupUser = {
  name: string;
  username: string;
  email: string;
  password: string;
  gender: string;
  token: string;
};

export const AuthContext = createContext<ContextType | null>(null);

const initialState = {
  name: "",
  username: "",
  email: "",
  gender: "",
  token: "",
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<User>(initialState);
  const isLoggedin = checkIfLoggedIn(setAuth);
  if (!isLoggedin)
    // const setLoginPending = (isLoginPending) => setAuth({ isLoginPending });
    // const setLoginSuccess = (isLoggedIn) => setAuth({ isLoggedIn });
    // const setLoginError = (loginError) => setAuth({ loginError });
    setLogin();

  const login = (email, password) => {
    // setLoginPending(true);
    // setLoginSuccess(false);
    // setLoginError(null);
    // fetchLogin(email, password, (error) => {
    //   setLoginPending(false);
    //   if (!error) {
    //     setLoginSuccess(true);
    //   } else {
    //     setLoginError(error);
    //   }
    // });
  };

  const logout = () => {
    // setLoginPending(false);
    // setLoginSuccess(false);
    // setLoginError(null);
  };

  const signup = ({
    name,
    username,
    email,
    password,
    gender,
    token,
  }: SignupUser) => {
    storeUser({ name, username, email, password, gender, token });
    redirect("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// fake login
const fetchLogin = (email, password, callback) =>
  setTimeout(() => {
    if (email === "admin" && password === "admin") {
      return callback(null);
    } else {
      return callback(new Error("Invalid email and password"));
    }
  }, 1000);

const checkIfLoggedIn = (
  userSetter: React.Dispatch<React.SetStateAction<null>>
) => {
  const getToken = getCookie("token");
  console.log("getToken", getToken);
  if (!getToken) return false;
  const getUserInLocal = getCookie("user");
  if (!getUserInLocal) return false;
  const user = JSON.parse(getUserInLocal);
  userSetter(user);
  return true;
};

const setLogin = () => {
  const token = tokenProvider();
  setCookie({ name: "token", value: token, days: 20 });
  localStorage.setItem("token", JSON.stringify(token));
};

const storeUser = ({ name, username, email, password, gender, token }) => {
  const prev = getCookie("user");
  if (!prev) {
    const userData = [
      {
        name,
        username,
        email,
        password,
        gender,
        token,
      },
    ];
    setCookie({ name: "user", value: JSON.stringify(userData), days: 30 });
    return;
  }
  const prevUser = JSON.parse(prev);
  console.log(prevUser);
};
