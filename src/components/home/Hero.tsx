import { IoInformationCircleOutline, IoPlayOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Movie } from "../../entities/Movies";
import { imagePath } from "../../utils/imagePath";
import useModalActive from "../../store/modalStore";
import VideoModal from "../modal/VideoModal";
import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  movie: Movie | undefined;
};

const Hero = ({ movie }: Props) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const setShowMovieDetails = useModalActive((m) => m.setShowMovieDetails);
  const showMovieDetails = useModalActive((m) => m.showMovieDetails);
  const navigate = useNavigate();
  const animation = {
    hidden: {
      y: "100%",
      opacity: "0",
      transitionTimingFunction: "cubic-bezier(.22,.68,0,1.71)",
      transitionDuration: "0.3s",
    },
    show: {
      y: 0,
      opacity: "1",
      transitionTimingFunction: "cubic-bezier(.22,.68,0,1.71)",
      transitionDuration: "0.3s",
    },
  };

  const image = imagePath + (movie?.backdrop_path || movie?.poster_path);
  const id = movie?.id;

  const handleWatchTrailer = () => {
    setShowMovieDetails(false);
    setIsModalActive(true);
  };

  const handleNavigateTo = () => {
    window.scrollTo({ top: 0 });
    navigate(`/movie/${id}`, { state: movie });
  };
  return (
    <section className="min-h-svh w-full">
      <div className="w-full ">
        <img src={image} className="w-full h-svh object-cover" />
      </div>
      <div className="absolute top-0 left-0 flex flex-col gap-14 justify-center items-start px-10 bg-gradient-to-t from-[#0f0f0f] to-transparent  w-full h-full z-20">
        <div className="max-w-[60%] flex flex-col gap-5">
          <motion.h2
            layoutId="movieTitle"
            className="text-7xl font-main font-bold"
          >
            {movie?.title}
          </motion.h2>
          <p className="max-w-[80%] font-main text-lg text-justify">
            {movie?.overview}
          </p>
        </div>
        <div className="flex gap-5 overflow-hidden">
          <motion.button
            variants={animation}
            initial="hidden"
            animate="show"
            exit="hidden"
            transition={{ type: "spring", stiffness: 100 }}
            onClick={handleWatchTrailer}
            className="flex items-center justify-center gap-2 bg-blue-600 px-10 py-4 rounded-full"
          >
            <IoPlayOutline className="text-slate-50" size="20" />
            <span className="text-xl font-main">Watch Trailer</span>
          </motion.button>
          <motion.button
            className="flex items-center justify-center gap-2 border-2 px-10 py-4 rounded-full"
            onClick={handleNavigateTo}
          >
            <span className="text-xl font-main">More info</span>
            <IoInformationCircleOutline size="20" className="text-slate-50" />
          </motion.button>
        </div>
      </div>
      {isModalActive && (
        <VideoModal
          setActive={setIsModalActive}
          showMovieDetails={showMovieDetails}
        />
      )}
    </section>
  );
};

export default Hero;
