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
  const { data, isPending, error } = useMovies();
  const [watchList, setWatchList] = useState<Movie[]>([]);
  const [is_watchList, setIs_watchList] = useState(false);
  const setHeroMovie = useMovieQuery((m) => m.setHeroMovie);
  const heroMovie = useMovieQuery((m) => m.heroMovie);

  const { getUser, getUsers } = useAuth();

  useEffect(() => {
    if (!data) return;

    const checkWatchList = () => {
      const user = getUser()!;
      if (!user) return;

      const allUsers = getUsers()!;
      const idx = allUsers.findIndex((u) => u.email === user.email);

      if (idx === undefined || idx === null) return null;

      const watchListMovies: Movie[] = getStorage("wt_li");
      if (!watchListMovies)
        return allUsers[idx].watchList.splice(
          0,
          allUsers[idx].watchList.length
        );

      const relatedWatchListMovies: Movie[] = [];
      for (let i = 0; i < watchListMovies.length; i++) {
        const getIdx = allUsers[idx].watchList.findIndex(
          (id) => id === watchListMovies[i].id
        );
        if (getIdx >= 0) relatedWatchListMovies.push(watchListMovies[i]);
      }

      if (relatedWatchListMovies.length > 0) {
        setIs_watchList(true);
        setWatchList(relatedWatchListMovies);
      } else setIs_watchList(false);
    };
    const randomNumber = Math.floor(Math.random() * data.results.length);
    const randomMovie = data?.results[randomNumber];
    setHeroMovie(randomMovie);
    checkWatchList();
  }, []);

  if (error) throw error;
  if (isPending) return <Spinner text="Loading" />;

  return (
    <ProtectedRoutes>
      <Hero movie={heroMovie} />
      <TrendingMovies />
      {is_watchList && <Watchlist watchlist={watchList} />}
    </ProtectedRoutes>
  );
};

export default Home;
