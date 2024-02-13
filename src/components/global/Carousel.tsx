import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { A11y } from "swiper/modules";
import { useModalActive, useMovieQuery } from "../../store/Store";
import { imagePath } from "../../utils/imagePath";
import { Movie } from "../../entities/Movies";
import SwiperBtn from "./SwiperBtn";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/controller";
import "swiper/css/scrollbar";
import "swiper/css";

type Props = {
  movies: Movie[] | undefined;
};
export const Carousel = ({ movies }: Props) => {
  const setMovieQuery = useMovieQuery((s) => s.setMovieQuery);
  const setModalActive = useModalActive((isActive) => isActive.setModalActive);
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
    setMovieQuery(movie);
    setModalActive();
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
