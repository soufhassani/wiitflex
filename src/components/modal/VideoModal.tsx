import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useMovieQuery from "../../store/movieStore";
import MovieDetails from "../movie/MovieDetails";
import useMovie from "../../hooks/useMovie";
import Spinner from "../global/Spinner";
import Video from "./modal video/Video";
type Props = {
  showMovieDetails: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoModal = ({ showMovieDetails, setActive }: Props) => {
  const movie = useMovieQuery((m) => m.movieQuery);
  const heroMovie = useMovieQuery((m) => m.heroMovie);
  const isMovie = showMovieDetails ? movie : heroMovie;

  const { data, isLoading, error } = useMovie({
    id: isMovie.id,
    mediaType: isMovie.media_type,
  });

  const height = showMovieDetails ? "h-full" : "h-auto";
  if (error) throw error;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(false);
      document.removeEventListener("keydown", handleKeyDown);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) setActive(false);
  };
  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-full h-full bg-transparent flex items-center justify-center backdrop-blur z-50"
        onClick={handleCloseModal}
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {isLoading ? (
          <Spinner text="Loading..." />
        ) : (
          <div
            className={`max-w-[90vw] w-full rounded-3xl max-h-[90vh] overflow-y-auto bg-zinc-900 flex flex-col scrollbar-thumb-red-500 scrollbar-thin scrollbar-track-transparent scrollbar-corner-transparent p-3 ${height} lg:max-w-[70vw]`}
          >
            <Video movie={data} showMovieDetails={showMovieDetails} />
            {showMovieDetails ? <MovieDetails movie={data!} /> : ""}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoModal;
