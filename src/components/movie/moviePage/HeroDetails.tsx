import { FaStar } from "react-icons/fa6";
import { IoIosCheckmark } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import useMovieQuery from "../../../store/movieStore";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { getStorage, setCookie, setStorage } from "../../../utils/cookies";
import { Movie } from "../../../entities/Movies";
import { motion } from "framer-motion";

const HeroDetails = () => {
  const selectedMovie = useMovieQuery((s) => s.selectedMovie);
  const [is_watchlist, setIs_watchlist] = useState(false);
  const { getUser, getUsers } = useAuth();

  const rating = selectedMovie.vote_average?.toFixed(1);

  const handleAddToWatchList = () => {
    const user = getUser()!;
    const allUser = getUsers()!;
    const idx = allUser?.findIndex((u) => u.email === user?.email);
    if (idx === undefined || idx === null) return;

    allUser[idx].watchList.push(selectedMovie.id);
    const newUsers = JSON.stringify(allUser);

    setCookie({ name: "users", value: newUsers, days: 30 });

    const watchlist: Movie[] = getStorage("wt_li");

    if (!watchlist) {
      const movie: Movie[] = [selectedMovie];
      setStorage({ key: "wt_li", value: JSON.stringify(movie) });
    } else {
      watchlist.push(selectedMovie);
      setStorage({ key: "wt_li", value: JSON.stringify(watchlist) });
    }

    setIs_watchlist(true);
  };
  const handleRemoveFromWatchList = () => {
    const user = getUser();
    const allUser = getUsers()!;
    const idx = allUser?.findIndex((u) => u.email === user?.email);
    if (idx === undefined || idx === null) return;

    const indx = allUser[idx].watchList.findIndex(
      (id) => id === selectedMovie.id
    );

    if (indx === undefined || indx === null) return;

    allUser[idx].watchList.splice(indx, 1);
    const newUsers = JSON.stringify(allUser);
    const watchlist: Movie[] = getStorage("wt_li");
    if (!watchlist)
      return setCookie({ name: "users", value: newUsers, days: 30 });

    const getWatchlistIndx = watchlist.findIndex(
      (m) => m.id === selectedMovie.id
    );
    watchlist.splice(getWatchlistIndx, 1);
    const newWatchlist = JSON.stringify(watchlist);
    setStorage({ key: "wt_li", value: newWatchlist });

    setIs_watchlist(false);
  };

  useEffect(() => {
    const chckerIsWatchlist = () => {
      const user = getUser()!;
      const allUser = getUsers()!;
      const idx = allUser?.findIndex((u) => u.email === user.email);
      const data = selectedMovie;
      if (idx === undefined || idx === null || idx < 0) {
        setIs_watchlist(false);
        return;
      }
      const indx = allUser[idx].watchList.findIndex((id) => id === data.id);
      if (indx === undefined || indx === null || indx < 0) {
        setIs_watchlist(false);
        return;
      }

      setIs_watchlist(true);
    };

    chckerIsWatchlist();
  }, []);

  return (
    <div className="absolute bottom-12 left-0 w-full px-10 flex justify-between z-20">
      <div className="flex flex-col justify-end">
        <motion.h2
          layoutId="movieTitle"
          className="uppercase font-main font-bold text-slate-50 text-3xl mb-9 "
        >
          {selectedMovie.name || selectedMovie.title}
        </motion.h2>
        <h6>
          <span className="text-slate-50">Original title: </span>
          <span className="text-slate-300">{selectedMovie.original_title}</span>
        </h6>
        <h6>
          <span className="text-slate-50">Original Language: </span>
          <span className="text-slate-300">
            {selectedMovie.original_language}
          </span>
        </h6>
        <h6>
          <span className="text-slate-50">Released date: </span>
          <span className="text-slate-300">{selectedMovie.release_date}</span>
        </h6>
      </div>
      <div className="flex items-end gap-20">
        <div className="flex flex-col gap-3">
          <h4 className="text-2xl font-semibold font-main">Rating</h4>
          <div className="flex items-start gap-2">
            <FaStar className="text-yellow-500 text-3xl" />
            <h6 className="text-3xl font-bold leading-8 ">
              {rating}
              <span className="text-xl align-baseline font-normal text-slate-300">
                /10
              </span>
            </h6>
          </div>
        </div>
        <div className="">
          {is_watchlist ? (
            <button
              onClick={handleRemoveFromWatchList}
              className="flex items-center gap-1 border-[1px] rounded-full py-3 px-6 border-blue-500 bg-blue-500 transition-all "
            >
              <IoIosCheckmark className="text-2xl" />
              <span className="text-xl font-main text-slate-50">Watchlist</span>
            </button>
          ) : (
            <button
              onClick={handleAddToWatchList}
              className="flex items-center gap-1 border-[1px] rounded-full py-3 px-6 bg-transparent transition-all hover:bg-blue-500 hover:border-blue-500"
            >
              <IoAdd className="text-2xl" />
              <span className="text-xl font-main text-slate-50">Watchlist</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroDetails;
