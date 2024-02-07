import { useEffect, useState } from "react";
import Hero from "../components/home/Hero";
import useMovies from "../hooks/useMovies";

const Home = () => {
  const [movieChosen, setMovieChosen] = useState(null);
  const { data, isLoading, error } = useMovies();

  if (error) throw new Error("an error in movies has been occured");
  if (isLoading) return console.log("isLoading...");
  console.log(data);
  const { results } = data;
  console.log(results);
  const randomNumber = Math.floor(Math.random() * results.length);
  const randomMovie = results[randomNumber];
  console.log(randomMovie);

  return (
    <div>
      <Hero movie={randomMovie} />
    </div>
  );
};

export default Home;
