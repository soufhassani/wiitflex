import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Movie, SingleMovie } from "../entities/Movies";
// import Games from "../entities/Games";

type MovieRequest = {
  results: Movie[];
};

const useMovie = (movie: Movie) => {
  const apiClient = new APIClient<SingleMovie>(
    `/${movie.media_type === "tv" ? "tv" : "movie"}/${movie.id}`
  );

  return useQuery({
    queryKey: ["Movie", "/movie"],
    queryFn: () =>
      apiClient.getMovie({
        params: { append_to_response: "videos" },
      }),
  });
};

export default useMovie;
