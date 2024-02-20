import React from "react";
import ReactPlayer from "react-player/youtube";
import { useModalActive, useMovieQuery } from "../../store/Store";
import useMovie from "../../hooks/useMovie";

import { Navigate } from "react-router-dom";
import Spinner from "../global/Spinner";
import Video from "./Video";

const Modal = () => {
  const movie = useMovieQuery((m) => m.movieQuery);
  const closeModal = useModalActive((m) => m.setModalActive);
  const { data, isLoading, error } = useMovie(movie);

  if (error) Navigate({ to: "/error" });

  if (isLoading) return <Spinner />;

  // console.log(videoTrailer);
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
      <div className="max-w-[70vw] w-full max-h-[90vh] h-full fle bg-zinc-900 flex flex-col">
        <Video movie={data} />
        <div className="flex">
          <div className="flex-1">
            <div className="pl-5 flex flex-col gap-4">
              <div>
                <h2 className="text-slate-50 text-4xl font-main font-semibold">
                  {data?.title || data?.name}
                </h2>
              </div>
              <div>
                <ul className="flex flex-col gap-2">
                  <li className="text-gray-400">
                    <h6>
                      Genres:{" "}
                      {data?.genres?.map((g, index) => (
                        <span key={g.id} className="text-gray-400">
                          {g.name}
                          {index !== data?.genres?.length! - 1 && ", "}
                        </span>
                      ))}
                    </h6>
                  </li>
                  <li className="text-gray-400">
                    <h6>
                      Original language:{" "}
                      <span className="text-gray-400">
                        {data?.original_language}
                      </span>
                    </h6>
                  </li>
                  <li className="text-gray-400">
                    <h6>
                      Original language:{" "}
                      <span className="text-gray-400">{data?.vote_count}</span>
                    </h6>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-slate-50 text-2xl font-main font-semibold">
                  Overview
                </h3>
                <p>{data?.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
