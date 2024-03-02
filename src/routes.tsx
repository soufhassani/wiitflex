import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import MoviePage from "./pages/MoviePage";
const Home = lazy(() => import("./pages/Home"));

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
