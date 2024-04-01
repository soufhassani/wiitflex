import React, { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { signingInRouter, signingOutRouter } from "../routes";
import { AuthContext } from "../context/AuthProvider.context";

const Routers = () => {
  const auth = useContext(AuthContext);
  console.log("authContext", auth);
  return (
    <RouterProvider
      router={auth?.auth.token ? signingInRouter : signingOutRouter}
    />
  );
};

export default Routers;
