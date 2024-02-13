import { Navigate } from "react-router-dom";
import useTrendingMovies from "../../hooks/useTrendingMovies";
import Spinner from "../global/Spinner";
import { Carousel } from "../global/Carousel";
import { useModalActive } from "../../store/Store";
import Modal from "../global/Modal";

const TrendingMovies = () => {
  const isModalActive = useModalActive((isActive) => isActive.modalActive);
  const { data, isLoading, error } = useTrendingMovies();
  if (error) Navigate({ to: "/error" });
  if (isLoading) return <Spinner />;
  // console.log("Trending Movies", data);

  return (
    <section className="px-10 pb-8">
      <div className="py-3">
        <h2 className="font-main text-xl font-medium">Trending now</h2>
      </div>
      <Carousel movies={data?.results} />
      {isModalActive && <Modal />}
    </section>
  );
};

export default TrendingMovies;
