import { Outlet } from "react-router-dom";
import Navbar from "../components/global/Navbar";
import { Suspense } from "react";
import Spinner from "../components/global/Spinner";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <Suspense fallback={<Spinner text="Loading..." />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
