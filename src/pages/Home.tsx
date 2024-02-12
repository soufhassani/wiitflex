import { Navigate } from "react-router-dom";
import Hero from "../components/home/Hero";
import TrendingMovies from "../components/home/TrendingMovies";
import useMovies from "../hooks/useMovies";
import Spinner from "../components/global/Spinner";
import Modal from "../components/global/Modal";
import { useModalActive } from "../store/Store";

const Home = () => {
  const { data, isLoading, error } = useMovies();

  if (error) Navigate({ to: "/error" });
  if (isLoading) return <Spinner />;
  console.log(data);
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
