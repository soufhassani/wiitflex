import useMovieQuery from "../../../store/movieStore";
import { imagePath } from "../../../utils/imagePath";

const BackgroundImage = () => {
  const selectedMovie = useMovieQuery((s) => s.selectedMovie);
  const image =
    imagePath + (selectedMovie?.backdrop_path || selectedMovie?.poster_path);
  return (
    <>
      <div className="bg-gradient-to-t from-[#0f0f0f] to-transparent absolute h-full w-full pointer-events-none select-none"></div>
      <img
        src={image}
        className="h-full w-full object-cover object-top pointer-events-none select-none"
      />
    </>
  );
};

export default BackgroundImage;
