import React from "react";
import useMovies from "../../hooks/useMovies";
import { Movies } from "../../entities/Movies";
import { imagePage } from "../../utils/imagePath";

type Props = {
  movie: Movies;
};

const Hero = ({ movie }: Props) => {
  const image = imagePage + (movie.backdrop_path || movie.poster_path);
  const sectionClasses = `bg-[url('${image}')] min-h-svh`;
  return (
    <section className="min-h-svh w-full absolute top-0 left-0">
      <div className="w-full ">
        <img src={image} className="w-full h-svh object-cover" />
      </div>
      <div className="absolute top-0 left-0 flex flex-col justify-center items-start gap-3 px-10 bg-gradient-to-t from-[#0f0f0f] to-transparent  w-full h-full z-20">
        <div>
          <h2 className="text-4xl font-bold">{movie.title}</h2>
          <p className="max-w-[50%] text-lg">{movie.overview}</p>
        </div>
        <div className="flex">
          <button>
            svg + <span>Play</span>
          </button>
          <button>
            <span>More info</span> + svg
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
