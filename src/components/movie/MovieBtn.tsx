import { IoInformationCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useMovieQuery from "../../store/movieStore";
// import useMovieQuery from "../../store/modalStore";

type Props = {
  id: number | undefined;
};

const MovieBtn = ({ id }: Props) => {
  const movie = useMovieQuery((m) => m.movieQuery);
  const navigate = useNavigate();
  const handleNavigateTo = () => {
    window.scrollTo({ top: 0 });
    navigate(movie.media_type === "movie" ? `/movie/${id}` : `/tv-show/${id}`, {
      state: movie,
    });
  };
  return (
    <div className="flex">
      <button
        className="flex-1 flex items-center justify-center gap-2 bg-red-600 px-10 py-4 rounded-full"
        onClick={handleNavigateTo}
      >
        <span className="text-xl font-main">More info</span>
        <IoInformationCircleOutline size="20" className="text-slate-50" />
      </button>
    </div>
  );
};

export default MovieBtn;
