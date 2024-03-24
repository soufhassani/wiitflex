import useMovieQuery from "../../../store/movieStore";
import BackgroundVideo from "./BackgroundVideo";
import HeroDetails from "./HeroDetails";

const Hero = () => {
  const selectedMovie = useMovieQuery((s) => s.selectedMovie);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  return (
    <div className="relative h-screen">
      <div
        className={`pointer-events-none select-none h-[${screenHeight}] w-[${screenWidth}] relative`}
      >
        <BackgroundVideo />
      </div>
      <div className="absolute right-10 top-5 z-50">
        <h2 className="uppercase font-main font-bold text-slate-50 text-3xl ">
          {selectedMovie.name || selectedMovie.title}
        </h2>
      </div>
      <HeroDetails />
    </div>
  );
};

export default Hero;
