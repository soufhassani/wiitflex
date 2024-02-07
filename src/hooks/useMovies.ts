import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Movies } from "../entities/Movies";
// import Games from "../entities/Games";

const apiClient = new APIClient<Movies>("/discover");
const useMovies = () =>
  useQuery({
    queryKey: ["Movies", "movie"],
    queryFn: () => apiClient.get("movie"),
  });

export default useMovies;
