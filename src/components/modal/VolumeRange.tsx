import { useRef, useState, useCallback, useEffect, RefObject } from "react";
import useVideoPlayerQuery from "../../store/videoPlayerStore";

export const VolumeRange = () => {
  const containerRef = useRef() as RefObject<HTMLDivElement>;
  const firstHalfRef = useRef() as RefObject<HTMLDivElement>;
  const secondHalfRef = useRef() as RefObject<HTMLDivElement>;
  const knobRef = useRef() as RefObject<HTMLDivElement>;

  const mute = useVideoPlayerQuery((s) => s.videoPlayer.mute);
  const volumeRange = useVideoPlayerQuery((s) => s.videoPlayer.volumeRange);
  const setVolumeRange = useVideoPlayerQuery((s) => s.setVolumeRange);

  const [{ dx, dy }, setOffset] = useState({
    dx: volumeRange,
    dy: 0,
  });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const startPos = {
        x: e.clientX - dx,
        y: e.clientY - dy,
      };

      const handleMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - startPos.x;
        const dy = e.clientY - startPos.y;

        setOffset({ dx, dy });
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [dx, dy]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];

      const startPos = {
        x: touch.clientX - dx,
        y: touch.clientY - dy,
      };

      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const dx = touch.clientX - startPos.x;
        const dy = touch.clientY - startPos.y;
        setOffset({ dx, dy });
      };

      const handleTouchEnd = () => {
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };

      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
      console.log("asdasdasdsd");
    },
    [dx, dy]
  );

  useEffect(() => {
    const container = containerRef.current;
    const firstHalfEle = firstHalfRef.current;
    const knobEle = knobRef.current;

    if (!container || !firstHalfEle || !knobEle) {
      return;
    }

    const containerWidth = container.getBoundingClientRect().width;
    const knobEleWidth = knobEle.getBoundingClientRect().width;
    const delta = Math.min(Math.max(0, dx), containerWidth);
    const knobRadius = knobEleWidth / 2;
    const knobPosition = mute ? 0 : delta - knobRadius;
    knobEle.style.transform = `translate3d(${knobPosition}px, 0, 0)`;
    const _position = (delta * 100) / containerWidth;
    const position = isNaN(_position) ? 0 : _position;
    const volumePower = mute ? 0 : position;
    firstHalfEle.style.width = `${volumePower}%`;
    setVolumeRange(position);
  }, [dx, volumeRange, setVolumeRange, mute]);

  return (
    <div
      className="h-[1rem] w-full flex items-center relative"
      ref={containerRef}
    >
      <div
        className="bg-[rgb(99,102,241)] h-[0.125rem] w-[50%]"
        ref={firstHalfRef}
      />
      <div
        className="size-[1rem] rounded-full bg-[rgb(99,102,241)] cursor-move	select-none	touch-none absolute top-0 left-0 "
        ref={knobRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
      <div
        className="bg-[rgb(203,213,225)] flex-1 h-[0.125rem]"
        ref={secondHalfRef}
      />
    </div>
  );
};

export default VolumeRange;
