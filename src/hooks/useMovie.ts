import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Movie } from "../entities/Movies";
// import Games from "../entities/Games";

type MovieRequest = {
  results: Movie[];
};

const apiClient = new APIClient<MovieRequest>("/discover");
const useMovie = (id: number) =>
  useQuery({
    queryKey: ["Movie", "/movie"],
    queryFn: () => apiClient.get(`movie/${id}`),
  });

export default useMovie;
