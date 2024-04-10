import Hero from "../components/home/Hero";
import TrendingMovies from "../components/home/TrendingMovies";
import useMovies from "../hooks/useMovies";
import Spinner from "../components/global/Spinner";
import Watchlist from "../components/home/Watchlist";
import { useEffect, useState } from "react";
import { Movie } from "../entities/Movies";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { data, isLoading, error } = useMovies();
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [is_watchlist, setIs_watchlist] = useState(false);

  const { getUser, getUsers } = useAuth();

  useEffect(() => {
    const checkWatchlist = () => {
      const user = getUser()!;
      const allUsers = getUsers()!;
      const idx = allUsers.findIndex((u) => u.email === user.email);
      if (idx === undefined || idx === null) return <></>;
      console.log(allUsers[idx]);
      const _watchlist = allUsers[idx].watchList;
      console.log("_watchlist: ", _watchlist);
      if (_watchlist.length > 0) {
        setIs_watchlist(true);
        setWatchlist(_watchlist);
      } else setIs_watchlist(false);
    };
    checkWatchlist();
  }, []);
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
      {is_watchlist && <Watchlist watchlist={watchlist} />}
    </>
  );
};

export default Home;
