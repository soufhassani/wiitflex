import { FaStar } from "react-icons/fa6";
import useMovieQuery from "../../../store/movieStore";
import { IoAdd } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";

const MovieDetails = () => {
  const selectedMovie = useMovieQuery((s) => s.selectedMovie);
  const setSelectedMovie = useMovieQuery((s) => s.setSelectedMovie);

  const handleAddToWatchlist = () => {
    setSelectedMovie({ ...selectedMovie, is_liked: true });
  };
  const handleRemoveFromWatchlist = () => {
    setSelectedMovie({ ...selectedMovie, is_liked: false });
  };
  return (
    <div className="absolute bottom-0 left-0 w-full px-10 flex justify-between">
      <div className="flex flex-col justify-end">
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
              {selectedMovie.vote_average}
              <span className="text-xl align-baseline font-normal text-slate-300">
                /10
              </span>
            </h6>
          </div>
        </div>
        <div className="">
          {selectedMovie.is_liked ? (
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

export default MovieDetails;
