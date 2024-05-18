import { Outlet } from "react-router-dom";
import Navbar from "../components/global/Navbar";
import { Suspense } from "react";
import Spinner from "../components/global/Spinner";
import Footer from "../components/global/Footer";
import { AnimatePresence } from "framer-motion";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <AnimatePresence>
          <Suspense fallback={<Spinner text="Loading..." />}>
            <Outlet />
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
