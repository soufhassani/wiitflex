import React from "react";
import { useModalActive, useMovieQuery } from "../../store/Store";
import MovieDetails from "../movie/MovieDetails";
import useMovie from "../../hooks/useMovie";
import Spinner from "../global/Spinner";
import Video from "./Video";

const Modal = () => {
  const movie = useMovieQuery((m) => m.movieQuery);
  const closeModal = useModalActive((m) => m.setModalActive);
  const { data, isLoading, error } = useMovie({
    id: movie.id,
    mediaType: movie.media_type,
  });

  if (error) throw error;

  if (isLoading) return <Spinner />;

  console.log("data: ", data);

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
      <div className="max-w-[70vw] w-full max-h-[90vh] h-full fle bg-zinc-900 flex flex-col">
        <Video movie={data} />
        <MovieDetails movie={data} />
      </div>
    </div>
  );
};

export default Modal;
