import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense, useEffect } from "react";
import useMovieQuery from "./store/movieStore";

const queryClient = new QueryClient();
function App() {
  // const setMovie = useMovieQuery((m) => m.setSelectedMovie);
  // useEffect(() => {
  //   const movie = localStorage.getItem("WMovie");
  //   if (movie) {
  //     setMovie(JSON.parse(movie));
  //   }
  // }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={null} />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
