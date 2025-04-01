import Hero from "../components/home/Hero";
import TrendingMovies from "../components/home/TrendingMovies";
import useMovies from "../hooks/useMovies";
import Spinner from "../components/global/Spinner";
import Watchlist from "../components/home/Watchlist";
import { useEffect, useState } from "react";
import { Movie } from "../entities/Movies";
import useAuth from "../hooks/useAuth";
import { getStorage } from "../utils/cookies";
import useMovieQuery from "../store/movieStore";
import ProtectedRoutes from "../components/global/ProtectedRoutes";

const Home = () => {
  const { data, isLoading, error } = useMovies();
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [is_watchlist, setIs_watchlist] = useState(false);
  const setHeroMovie = useMovieQuery((m) => m.setHeroMovie);

  const { getUser, getUsers } = useAuth();

  useEffect(() => {
    const checkWatchlist = () => {
      const user = getUser()!;
      if (!user) return;
      const allUsers = getUsers()!;
      const idx = allUsers.findIndex((u) => u.email === user.email);
      if (idx === undefined || idx === null) return null;
      const whatchlistMovies: Movie[] = getStorage("wt_li");

      if (!whatchlistMovies)
        return allUsers[idx].watchList.splice(
          0,
          allUsers[idx].watchList.length
        );

      const relatedWatchlistMovies: Movie[] = [];
      for (let i = 0; i < whatchlistMovies.length; i++) {
        const getIdx = allUsers[idx].watchList.findIndex(
          (id) => id === whatchlistMovies[i].id
        );
        if (getIdx >= 0) relatedWatchlistMovies.push(whatchlistMovies[i]);
      }
      if (relatedWatchlistMovies.length > 0) {
        setIs_watchlist(true);
        setWatchlist(relatedWatchlistMovies);
      } else setIs_watchlist(false);
    };
    checkWatchlist();
  }, []);

  if (error) throw error;
  if (isLoading) return <Spinner text="Loading" />;

  let randomMovie;
  if (data) {
    const randomNumber = Math.floor(Math.random() * data.results.length);
    randomMovie = data.results[randomNumber];
    setHeroMovie(randomMovie);
  }

  return (
    <ProtectedRoutes>
      <Hero movie={randomMovie} />
      <TrendingMovies />
      {is_watchlist && <Watchlist watchlist={watchlist} />}
    </ProtectedRoutes>
  );
};

export default Home;
