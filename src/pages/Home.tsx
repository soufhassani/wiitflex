import Hero from "../components/home/Hero";
import { Movie } from "../entities/Movies";
import useMovies from "../hooks/useMovies";

const Home = () => {
  const { data, isLoading, error } = useMovies();

  if (error) throw new Error("an error in movies has been occured");
  if (isLoading) return console.log("isLoading...");
  console.log(data);
  let randomMovie;
  if (data) {
    const randomNumber = Math.floor(Math.random() * data.results.length);
    randomMovie = data.results[randomNumber];
  }

  return (
    <div>
      <Hero movie={randomMovie} />
    </div>
  );
};

export default Home;
