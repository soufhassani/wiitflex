import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/global/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
