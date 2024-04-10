import { useState } from "react";
import { Carousel } from "../global/Carousel";
import Modal from "../modal/VideoModal";
import useModalActive from "../../store/modalStore";
import { Movie } from "../../entities/Movies";

type Props = {
  watchlist: Movie[];
};

const Watchlist = ({ watchlist }: Props) => {
  const [isModalActive, setIsModalActive] = useState(false);

  const showMovieDetails = useModalActive((m) => m.showMovieDetails);
  // const checkWatchlist = () =>

  // setIs_watchlist(true);
  // const newUsers = JSON.stringify(allUsers);
  // setCookie({ name: "users", value: newUsers, days: 30 });

  return (
    <section className="px-10 pb-8">
      <div className="py-3">
        <h2 className="font-main text-xl font-medium">Your Watchlist</h2>
      </div>
      <Carousel movies={watchlist} setIsActive={setIsModalActive} />
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
