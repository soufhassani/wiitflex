import useMovieQuery from "../../../store/movieStore";
import { imagePath } from "../../../utils/imagePath";
import MovieDetails from "./MovieDetails";

const Hero = () => {
  const selectedMovie = useMovieQuery((s) => s.selectedMovie);
  console.log("selectedMovie: ", selectedMovie);
  const image =
    imagePath + (selectedMovie?.backdrop_path || selectedMovie?.poster_path);
  return (
    <div className="relative">
      <div>
        <div className="bg-gradient-to-t from-[#0f0f0f] to-transparent absolute h-full w-full pointer-events-none select-none"></div>
        <img
          src={image}
          className="h-[700px] w-full object-cover object-top pointer-events-none select-none"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="font-main text-slate-50 text-5xl font-semibold">
          {selectedMovie.name || selectedMovie.title}
        </h2>
      </div>
      <MovieDetails />
    </div>
  );
};

export default Hero;
