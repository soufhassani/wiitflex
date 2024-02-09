import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const Layout = lazy(() => import("./pages/Layout"));
const Home = lazy(() => import("./pages/Home"));
const Error = lazy(() => import("./pages/Error"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [{ index: true, element: <Home /> }],
  },
]);

export default router;
