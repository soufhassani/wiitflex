import useTrendingMovies from "../../hooks/useTrendingMovies";
import Modal from "../modal/Modal";
import Spinner from "../global/Spinner";
import { Carousel } from "../global/Carousel";
import useModalActive from "../../store/modalStore";
import { useState } from "react";

const TrendingMovies = () => {
  const { data, isLoading, error } = useTrendingMovies();

  const [isModalActive, setIsModalActive] = useState(false);
  const showMovieDetails = useModalActive((m) => m.showMovieDetails);

  if (error) throw error;

  return (
    <section className="px-10 pb-8">
      {isLoading ? (
        <Spinner text="Loading..." />
      ) : (
        <>
          <div className="py-3">
            <h2 className="font-main text-xl font-medium">Trending now</h2>
          </div>
          <Carousel movies={data?.results} setIsActive={setIsModalActive} />
          {isModalActive ? (
            <Modal
              setActive={setIsModalActive}
              showMovieDetails={showMovieDetails}
            />
          ) : (
            ""
          )}
        </>
      )}
    </section>
  );
};

export default TrendingMovies;
