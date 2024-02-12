import { IoInformationCircleOutline, IoPlayOutline } from "react-icons/io5";
import { Movie } from "../../entities/Movies";
import { imagePage } from "../../utils/imagePath";

type Props = {
  movie: Movie | undefined;
};

const Hero = ({ movie }: Props) => {
  const image = imagePage + (movie?.backdrop_path || movie?.poster_path);
  return (
    <section className="min-h-svh w-full">
      <div className="w-full ">
        <img src={image} className="w-full h-svh object-cover" />
      </div>
      <div className="absolute top-0 left-0 flex flex-col gap-14 justify-center items-start px-10 bg-gradient-to-t from-[#0f0f0f] to-transparent  w-full h-full z-20">
        <div className="flex flex-col gap-5">
          <h2 className="text-7xl font-main font-bold">{movie?.title}</h2>
          <p className="max-w-[35%] font-main text-lg text-justify">
            {movie?.overview}
          </p>
        </div>
        <div className="flex gap-5">
          <button className="flex items-center justify-center gap-2 bg-red-600 px-10 py-4 rounded-full">
            <IoPlayOutline className="text-slate-50" size="20" />
            <span className="text-xl font-main">Play</span>
          </button>
          <button className="flex items-center justify-center gap-2 border-2 px-10 py-4 rounded-full">
            <span className="text-xl font-main">More info</span>
            <IoInformationCircleOutline size="20" className="text-slate-50" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
