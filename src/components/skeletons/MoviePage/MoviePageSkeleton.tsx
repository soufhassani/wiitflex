import { Movie } from "../../../entities/Movies";
import MovieDetail from "./MovieDetail";
import MoviePageBgImage from "./MoviePageBgImage";

type Props = {
  movie: Movie;
};

const MoviePageSkeleton = ({ movie }: Props) => {
  console.log(movie);
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="pointer-events-none select-none h-full w-full">
        <MoviePageBgImage
          image={movie.backdrop_path || movie.poster_path || ""}
        />
      </div>
      <MovieDetail title={movie.name || movie.title} />
    </div>
  );
};

export default MoviePageSkeleton;
