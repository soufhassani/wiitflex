import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Movie } from "../entities/Movies";


const apiClient = new APIClient<Movie>("/discover/movie");
const useMovies = () =>
  useQuery({
    queryKey: ["Movies", "/discover/movie"],
    queryFn: () =>
      apiClient.getAll({
        params: {
          include_video: true,
        },
      }),
  });

export default useMovies;
