import React, { useState } from "react";
import { Carousel } from "../global/Carousel";
import Modal from "../modal/VideoModal";
import useModalActive from "../../store/modalStore";

const Watchlist = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const showMovieDetails = useModalActive((m) => m.showMovieDetails);
  return (
    <section className="px-10 pb-8">
      <div className="py-3">
        <h2 className="font-main text-xl font-medium">Trending now</h2>
      </div>
      <Carousel movies={data?.results} setIsActive={setIsModalActive} />
      {isModalActive && (
        <Modal
          setActive={setIsModalActive}
          showMovieDetails={showMovieDetails}
        />
      )}
    </section>
  );
};

export default Watchlist;
