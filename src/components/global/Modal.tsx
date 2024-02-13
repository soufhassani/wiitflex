import React from "react";
import ReactPlayer from "react-player/youtube";
import { useModalActive, useMovieQuery } from "../../store/Store";
import useMovie from "../../hooks/useMovie";
import { imagePath } from "../../utils/imagePath";
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";

const Modal = () => {
  const movie = useMovieQuery((m) => m.movieQuery);
  const closeModal = useModalActive((m) => m.setModalActive);
  const { data, isLoading, error } = useMovie(movie);

  if (error) Navigate({ to: "/error" });

  if (isLoading) return <Spinner />;

  const videoIdx =
    data?.videos?.results.findIndex((element) => element.type === "Trailer") ||
    0;
  const videoTrailer = data?.videos?.results[videoIdx].key;
  console.log(videoTrailer);
  console.log("data", data);

  const handleCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) closeModal();
  };
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-transparent flex items-center justify-center backdrop-blur z-[999999]"
      onClick={handleCloseModal}
    >
      <div className="max-w-[900px] w-full max-h-[90vh] h-full fle bg-zinc-900 flex flex-col px-10 py-5">
        <div className="aspect-square ">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoTrailer}`}
            fallback={
              <img
                src={imagePath + (movie?.backdrop_path || movie?.poster_path)}
              />
            }
            width="100%"
            height="100%"
            playing
          />
          {/* </video> */}
        </div>
        <h2 className="text-slate-50 text-9xl">{movie.title || movie.name}</h2>
      </div>
    </div>
  );
};

export default Modal;
