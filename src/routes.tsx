import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
const Home = lazy(() => import("./pages/Home"));
const MoviePage = lazy(() => import("./pages/MoviePage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "movie/:type/:id",
        element: <MoviePage />,
      },
    ],
  },
]);

export default router;
