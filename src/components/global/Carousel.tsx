import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Movie } from "../../entities/Movies";
import { imagePage } from "../../utils/imagePath";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/controller";
import "swiper/css/scrollbar";
import { Swiper as SwiperType } from "swiper/types";

type Props = {
  movies: Movie[] | undefined;
};
export const Carousel = ({ movies }: Props) => {
  const [prevSlide, setPrevSlide] = useState<Element | null | undefined>(null);
  const [fifthSlide, setFifthSlide] = useState<Element | null>(null);

  const handleOnSlide = (s: SwiperType) => {
    const fifthSlide = s.el.querySelector(
      `[aria-label="${s.activeIndex + 6} / 20"]`
    );
    setFifthSlide(fifthSlide);
    setOpacityFifthSlide(s);
    const newPrevSlid = s.el.querySelector(
      `[aria-label="${s.activeIndex} / 20"]`
    );
    setPrevSlide(newPrevSlid);
  };
  const handleSlideChange = (s: SwiperType) => {
    setOpacityFifthSlide(s);
    setOpacityPrevSlide(s);
  };

  const setOpacityFifthSlide = (s: SwiperType) => {
    const newFifthSlide = s.el.querySelector(
      `[aria-label="${s.activeIndex + 6} / 20"]`
    );

    if (fifthSlide !== newFifthSlide) {
      fifthSlide?.classList.remove("opacity-20");
      newFifthSlide?.classList.add("opacity-20");
      setFifthSlide(newFifthSlide);
    }
  };

  const setOpacityPrevSlide = (s: SwiperType) => {
    const newPrevSlid = s.el.querySelector(
      `[aria-label="${s.activeIndex} / 20"]`
    );
    console.log(prevSlide);
    console.log(newPrevSlid);
    if (prevSlide !== newPrevSlid) {
      prevSlide?.classList.remove("opacity-20");
      newPrevSlid?.classList.add("opacity-20");
    } else {
      prevSlide?.classList.add("opacity-20");
    }
    setPrevSlide(newPrevSlid);
  };
  // const opacityClass = prevSlide
  //   ? "opacity-60"
  //   : fifthSlide
  //   ? "opacity-60"
  //   : "opacity-100";
  return (
    <Swiper
      className="!overflow-visible"
      modules={[A11y]}
      spaceBetween={10}
      slidesPerView={5}
      onSlideChange={handleSlideChange}
      onSwiper={handleOnSlide}
    >
      {movies?.map((m) => (
        <SwiperSlide
          key={m.id}
          className="!transition-[transform,opacity] !duration[250ms] "
        >
          <img src={imagePage + (m?.backdrop_path || m?.poster_path)} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
