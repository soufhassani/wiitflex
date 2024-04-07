import MovieTitle from "./MovieTitle";
import MovieMeta from "./MovieMeta";
import { Movie } from "../../entities/Movies";
import MovieBtn from "./MovieBtn";

type Props = {
  movie: Movie | undefined;
};

const MovieDetails = ({ movie }: Props) => {
  return (
    <div className="flex flex-col justify-between w-full h-1/3 py-5 px-10">
      <div className="flex gap-10">
        <div className="flex flex-col gap-4 w-full">
          <MovieTitle title={movie?.title} name={movie?.name} />
          <MovieMeta genres={movie?.genres} />
        </div>
        <div className="flex flex-col gap-4 ">
          <div className=" flex items-end min-h-[40px]">
            <h3 className="text-slate-50 text-2xl font-main font-semibold">
              Overview
            </h3>
          </div>
          <div className="flex-1">
            <p>{movie?.overview}</p>
          </div>
        </div>
      </div>
      {movie && <MovieBtn id={movie.id} />}
    </div>
  );
};

export default MovieDetails;
