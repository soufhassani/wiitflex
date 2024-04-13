import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { SingleMovie } from "../entities/Movies";

type Props = {
  mediaType: string | undefined;
  id: number;
};
const useMovie = ({ mediaType, id }: Props) => {
  console.log("mediaType: ", mediaType);
  const apiClient = new APIClient<SingleMovie>(
    `/${
      mediaType === "tv-show" ? "tv" : mediaType === "tv" ? "tv" : "movie"
    }/${id}`
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
