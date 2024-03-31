import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";

// const Home = lazy(() => import("./pages/Home"));
// const MoviePage = lazy(() => import("./pages/MoviePage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: lazy(() => import("./pages/Home")) },
      {
        path: "movie/:id",
        Component: lazy(() => import("./pages/MoviePage")),
      },
      {
        path: "tv-show/:id",
        Component: lazy(() => import("./pages/MoviePage")),
      },
    ],
  },
]);

export default router;
