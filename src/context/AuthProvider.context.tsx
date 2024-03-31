import React, { ReactNode, createContext, useState } from "react";
import User from "../entities/User";

type Props = {
  children: ReactNode;
};

const AuthContext = createContext(null);

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState(null);
  console.log("Auth", auth);
  checkIfLoggedIn(setAuth);

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

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
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
  const getUserInLocal = localStorage.getItem("user");
  if (!getUserInLocal) return false;
  const user = JSON.parse(getUserInLocal);
  userSetter(user);
};

const setLogin = () => {
  const token = tokenProvider();
  localStorage.setItem("token", JSON.stringify(token));
};

const tokenProvider = () => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomText = "";

  for (let i = 0; i < 150; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomText += charset[randomIndex];
  }

  return randomText;
};
