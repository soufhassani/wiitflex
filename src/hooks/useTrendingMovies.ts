import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Movie } from "../entities/Movies";

const apiClient = new APIClient<Movie>("/trending/all");
const useTrendingMovies = () =>
  useQuery({
    queryKey: ["Trending", "/trending"],
    queryFn: () => apiClient.get("week"),
    gcTime: 0,
  });

export default useTrendingMovies;
