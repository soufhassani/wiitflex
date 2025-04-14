import MovieTitle from "./MovieTitle";
import MovieMeta from "./MovieMeta";
import { Movie } from "../../entities/Movies";
import MovieBtn from "./MovieBtn";
import textReducer from "../../utils/textReducer";

type Props = {
  movie: Movie;
};

const MovieDetails = ({ movie }: Props) => {
  return (
    <div className="flex flex-col basis-1/2 gap-5 justify-between w-full  relative pt-5 pb-4 md:px-10">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex flex-col gap-4 w-full ">
          <MovieTitle title={movie?.title} name={movie?.name} />
          <MovieMeta genres={movie?.genres} />
        </div>
        <div className="flex flex-col gap-4 ">
          <div className=" flex items-end min-h-[40px]">
            <h3 className="text-slate-50 text-2xl font-main font-semibold">
              Overview
            </h3>
          </div>
          <div className="basis-9/12">
            <p>{textReducer({ text: movie.overview, limit: 220 })}</p>
          </div>
        </div>
      </div>
      {movie && <MovieBtn id={movie.id} />}
    </div>
  );
};

export default MovieDetails;
