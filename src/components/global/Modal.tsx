import React from "react";
import { useModalActive, useMovieQuery } from "../../store/Store";

const Modal = () => {
  const movie = useMovieQuery((m) => m.movieQuery);
  const closeModal = useModalActive((m) => m.setModalActive);
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
      <div className="max-w-[600px] w-full max-h-[600px] h-full fle bg-zinc-900 flex justify-center items-center">
        <h2 className="text-slate-50">{movie.title}</h2>
      </div>
    </div>
  );
};

export default Modal;
