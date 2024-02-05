import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
const Layout = lazy(() => import("./pages/Layout"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: null,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
    ],
  },
]);

export default router;
