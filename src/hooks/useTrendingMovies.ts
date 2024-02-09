import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Movie } from "../entities/Movies";
type MovieRequest = {
  results: Movie;
};
const apiClient = new APIClient<Movie>("/trending/all");
const useTrendingMovies = () =>
  useQuery({
    queryKey: ["Trending", "/trending"],
    queryFn: () => apiClient.get("week"),
  });

export default useTrendingMovies;
