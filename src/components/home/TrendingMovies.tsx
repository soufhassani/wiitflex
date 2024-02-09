import useTrendingMovies from "../../hooks/useTrendingMovies";
import { Navigate } from "react-router-dom";
import Spinner from "../global/Spinner";
import { Carousel } from "../global/Carousel";

const TrendingMovies = () => {
  const { data, isLoading, error } = useTrendingMovies();
  if (error) Navigate({ to: "/error" });
  if (isLoading) return <Spinner />;
  console.log("Trending Movies", data);

  return (
    <section className="px-10">
      <div>
        <h2>Trending now</h2>
      </div>
      <Carousel movies={data?.results} />
    </section>
  );
};

export default TrendingMovies;
