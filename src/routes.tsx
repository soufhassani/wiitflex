import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";

// const Layout = lazy(() => import("./pages/Layout"));
const Home = lazy(() => import("./pages/Home"));
// const Error = lazy(() => import("./pages/Error"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Home /> }],
  },
]);

export default router;
