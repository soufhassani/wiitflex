import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSwiper } from "swiper/react";

type Props = {
  dataLength: number | undefined;
  isFirstSlide: boolean;
  isLastSlide: boolean;
};

const SwiperBtn = ({ dataLength, isFirstSlide, isLastSlide }: Props) => {
  const swiper = useSwiper();
  const handleNextSlide = () => {
    swiper.slideNext();
    console.log("active idx: ", swiper.activeIndex);
    console.log("lastSlideIdx: ", lastSlideIdx);
  };
  const handlePrevSlide = () => {
    swiper.slidePrev();
    console.log(swiper);
  };

  const lastSlideIdx = dataLength ? dataLength - 1 : 0;

  return (
    <>
      <button
        disabled={isLastSlide}
        onClick={handleNextSlide}
        className={
          "absolute top-[50%] right-[-40px] translate-y-[-50%] h-full w-[30px] bg-[rgba(0,0,0,0.7)] transition-all duration-200 ease-in z-10" +
          `${isLastSlide ? " pointer-events-none opacity-0" : ""}`
        }
      >
        <FaChevronRight
          size={25}
          className={isLastSlide ? "text-gray-700" : "text-slate-50"}
          opacity={isLastSlide ? "0.7" : "1"}
        />
      </button>
      <button
        disabled={isFirstSlide}
        onClick={handlePrevSlide}
        className={
          "absolute top-[50%] left-[-40px] translate-y-[-50%] h-full w-[30px] bg-[rgba(0,0,0,0.7)] transition-all duration-200 ease-in z-10" +
          `${isFirstSlide ? " pointer-events-none opacity-0" : ""}`
        }
      >
        <FaChevronLeft
          size={25}
          className={isFirstSlide ? "text-gray-700" : "text-slate-50"}
          opacity={isFirstSlide ? "0.2" : "1"}
        />
      </button>
    </>
  );
};

export default SwiperBtn;
