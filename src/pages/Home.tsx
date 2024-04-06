import Hero from "../components/home/Hero";
import TrendingMovies from "../components/home/TrendingMovies";
import useMovies from "../hooks/useMovies";
import Spinner from "../components/global/Spinner";

const Home = () => {
  const { data, isLoading, error } = useMovies();

  if (error) throw error;
  if (isLoading) return <Spinner text="Loading..." />;

  let randomMovie;
  if (data) {
    const randomNumber = Math.floor(Math.random() * data.results.length);
    randomMovie = data.results[randomNumber];
  }

  return (
    <>
      <Hero movie={randomMovie} />
      <TrendingMovies />
    </>
  );
};

export default Home;
