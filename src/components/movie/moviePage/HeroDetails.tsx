import { FaStar } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import useMovieQuery from "../../../store/movieStore";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { getStorage, setCookie } from "../../../utils/cookies";

const HeroDetails = () => {
  const selectedMovie = useMovieQuery((s) => s.selectedMovie);
  const [is_watchlist, setIs_watchlist] = useState(false);
  const { getUser, getUsers } = useAuth();

  const rating = selectedMovie.vote_average?.toFixed(1);

  const handleAddToWatchlist = () => {
    const user = getUser()!;
    const data = selectedMovie;

    const watchlist = getStorage("wt_li");
    // if (idx === undefined || idx === null) return;
    // console.log(allUser[idx]);
    // allUser[idx].watchList.push(data);
    // console.log("allUSers after: ", allUser[idx]);
    // const newUsers = JSON.stringify(allUser);
    // setCookie({ name: "users", value: newUsers, days: 30 });
    setIs_watchlist(true);
    // eraseCookie("users");
  };
  const handleRemoveFromWatchlist = () => {
    const user = getUser();
    const allUser = getUsers()!;
    const idx = allUser?.findIndex((u) => u.email === user?.email);
    const data = selectedMovie;
    if (idx === undefined || idx === null) return;

    const indx = allUser[idx].watchList.findIndex((w) => w.id === data.id);
    if (indx === undefined || indx === null) return;
    allUser[idx].watchList.splice(indx, 1);

    setIs_watchlist(false);
    const newUsers = JSON.stringify(allUser);
    setCookie({ name: "users", value: newUsers, days: 30 });
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

      const indx = allUser[idx].watchList.findIndex((w) => w.id === data.id);
      console.log("indx of movie", indx);
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
        <h2 className="uppercase font-main font-bold text-slate-50 text-3xl mb-9 ">
          {selectedMovie.name || selectedMovie.title}
        </h2>
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
              onClick={handleRemoveFromWatchlist}
              className="flex items-center gap-1 border-2 rounded-full py-3 px-6 border-red-500 bg-red-500 transition-all "
            >
              <TiDelete className="text-2xl" />
              <span className="text-xl font-main text-slate-50">
                Remove From Watchlist
              </span>
            </button>
          ) : (
            <button
              onClick={handleAddToWatchlist}
              className="flex items-center gap-1 border-2 rounded-full py-3 px-6 bg-transparent transition-all hover:bg-red-500 hover:border-red-500"
            >
              <IoAdd className="text-2xl" />
              <span className="text-xl font-main text-slate-50">
                Add To Watchlist
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroDetails;
