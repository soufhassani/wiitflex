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
      <div className="max-w-[70vw] w-full max-h-[90vh] h-full fle bg-zinc-900 flex flex-col px-10 py-5">
        <div className="flex">
          <div className="aspect-video flex-1">
            <ReactPlayer
              url={`https://www.youtube.com/embed/${videoTrailer}`}
              fallback={
                <img
                  src={imagePath + (movie?.backdrop_path || movie?.poster_path)}
                />
              }
              width="100%"
              height="100%"
              playing
            />
          </div>
          <div className="flex-1">
            <div className="pl-5 flex flex-col">
              <h2 className="text-slate-50 text-4xl font-main font-semibold">
                {data?.title || data?.name}
              </h2>
              <ul className="flex gap-2">
                {data?.genres?.map((g) => (
                  <li key={g.id} className="text-gray-600 ">
                    {g.name}
                  </li>
                ))}
              </ul>
              <p>{data?.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
