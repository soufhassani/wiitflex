import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { A11y } from "swiper/modules";
import useModalActive from "../../store/modalStore";
import { imagePath } from "../../utils/imagePath";
import { Movie } from "../../entities/Movies";
import SwiperBtn from "./SwiperBtn";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/controller";
import "swiper/css/scrollbar";
import "swiper/css";
import useMovieQuery from "../../store/movieStore";

type Props = {
  movies: Movie[] | undefined;
  setIsActive: (a: boolean) => void;
};
export const Carousel = ({ movies, setIsActive }: Props) => {
  const setMovieQuery = useMovieQuery((s) => s.setMovieQuery);
  const setShowMovieDetails = useModalActive((m) => m.setShowMovieDetails);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(true);
  const handleOnSwiper = (s: SwiperType) => {
    checkFirstSlide(s.activeIndex);
    checkLastSlide(s.activeIndex);
  };
  const handleOnSlideChange = (s: SwiperType) => {
    checkFirstSlide(s.activeIndex);
    checkLastSlide(s.activeIndex);
  };
  const checkFirstSlide = (idx: number) => {
    if (idx === 0) setIsFirstSlide(true);
    else setIsFirstSlide(false);
  };
  const checkLastSlide = (idx: number) => {
    const lastSlideIdx = movies?.length ? movies?.length - 1 : 0;
    if (idx + 4 === lastSlideIdx) setIsLastSlide(true);
    else setIsLastSlide(false);
  };

  const handleImageClick = (movie: Movie) => {
    console.log("movie: ", movie);
    setMovieQuery(movie);
    setShowMovieDetails(true);
    setIsActive(true);
  };

  return (
    <Swiper
      className="!overflow-visible relative"
      modules={[A11y]}
      spaceBetween={10}
      slidesPerView={5}
      onSlideChange={handleOnSlideChange}
      onSwiper={handleOnSwiper}
    >
      {movies?.map((m) => (
        <SwiperSlide
          key={m.id}
          className="!transition-[transform,opacity] !duration[250ms]"
        >
          <img
            className="cursor-pointer"
            src={imagePath + (m?.backdrop_path || m?.poster_path)}
            onClick={() => handleImageClick(m)}
          />
        </SwiperSlide>
      ))}
      <SwiperBtn
        isFirstSlide={isFirstSlide}
        isLastSlide={isLastSlide}
        dataLength={movies?.length}
      />
    </Swiper>
  );
};
