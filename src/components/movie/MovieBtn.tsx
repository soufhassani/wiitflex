import { IoInformationCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useMovieQuery } from "../../store/Store";

type Props = {
  id: number | undefined;
};

const MovieBtn = ({ id }: Props) => {
  const movie = useMovieQuery((m) => m.movieQuery);
  return (
    <div className="px-5">
      <Link
        className="flex items-center justify-center gap-2 bg-red-600 px-10 py-4 rounded-full"
        to={`/movie/${movie.media_type}/${id}`}
      >
        <span className="text-xl font-main">More info</span>
        <IoInformationCircleOutline size="20" className="text-slate-50" />
      </Link>
    </div>
  );
};

export default MovieBtn;
