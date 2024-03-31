import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import { AuthProvider } from "./context/AuthProvider.context";

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
      <AuthProvider>
        <Suspense fallback={null} />
        <RouterProvider router={router} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
