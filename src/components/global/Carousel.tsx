import React, { useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Movie } from "../../entities/Movies";
import { imagePage } from "../../utils/imagePath";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/controller";
import "swiper/css/scrollbar";
import { Swiper as SwiperType } from "swiper/types";
import { FaAngleRight, FaChevronLeft } from "react-icons/fa";
import SwiperBtn from "./SwiperBtn";

type Props = {
  movies: Movie[] | undefined;
};
export const Carousel = ({ movies }: Props) => {
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
          <img src={imagePage + (m?.backdrop_path || m?.poster_path)} />
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
