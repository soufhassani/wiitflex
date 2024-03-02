import React from "react";
import MovieTitle from "./MovieTitle";
import MovieMeta from "./MovieMeta";
import { Movie } from "../../entities/Movies";
import MovieBtn from "./MovieBtn";

type Props = {
  movie: Movie | undefined;
};

const MovieDetails = ({ movie }: Props) => {
  return (
    <div className="flex flex-col w-full h-1/3">
      <div className="p-5 flex gap-5">
        <div className="flex flex-col gap-4 w-full">
          <MovieTitle title={movie?.title} name={movie?.name} />
          <MovieMeta
            genres={movie?.genres}
            original_language={movie?.original_language}
            vote_count={movie?.vote_count}
          />
        </div>
        <div className="flex flex-col gap-4 ">
          <h3 className="text-slate-50 text-2xl font-main font-semibold">
            Overview
          </h3>
          <p>{movie?.overview}</p>
        </div>
      </div>
      {movie && <MovieBtn id={movie.id} />}
    </div>
  );
};

export default MovieDetails;
