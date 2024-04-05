import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import { AuthProvider } from "./context/AuthProvider.context";
import Routers from "./pages/Routers";

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
      {/* <AuthProvider> */}
      <Suspense fallback={null} />
      <Routers />
      {/* </AuthProvider> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
