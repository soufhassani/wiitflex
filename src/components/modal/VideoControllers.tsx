import { FaPause, FaPlay } from "react-icons/fa6";
import useVideoPlayerQuery from "../../store/videoPlayerStore";
import React, { useCallback, useEffect, useRef } from "react";
import Controllers from "./Controllers";

const VideoControllers = () => {
  const playerControls = useRef<HTMLDivElement>(null);
  const playMain = useRef<HTMLDivElement>(null);
  const play = useVideoPlayerQuery((s) => s.videoPlayer.play);
  const setPlay = useVideoPlayerQuery((s) => s.setPlay);
  const controllersAreHidden = useVideoPlayerQuery(
    (s) => s.videoPlayer.controllersAreHidden
  );
  const setControllersAreHidden = useVideoPlayerQuery(
    (s) => s.setControllersAreHidden
  );
  const handleVideoPlay = (e: React.MouseEvent) => {
    fullScreenHidingControllers(e);
    setPlay(!play);

    playMain.current?.classList.add("animate-fadeOut");
    setTimeout(
      () => playMain.current?.classList.remove("animate-fadeOut"),
      500
    );
  };
  const handleContainerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      handleVideoPlay(e);
    }
  };

  const timeoutId = useRef(0);
  const fullScreenHidingControllers = useCallback(
    (e: React.MouseEvent) => {
      setControllersAreHidden(false);
      clearTimeout(timeoutId.current);
      if (e.target === playerControls.current) {
        timeoutId.current = setTimeout(
          () => setControllersAreHidden(true),
          4000
        );
      }
    },
    [setControllersAreHidden]
  );

  useEffect(() => {
    const descendent = (e: MouseEvent) => {
      const isElem = e.target instanceof Element;
      let node;
      if (isElem) node = e.target.parentNode;
      while (node != null) {
        if (node == playerControls.current) {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    };

    const handleControllersShow = (e: MouseEvent) => {
      if (e.target === playerControls.current) {
        setControllersAreHidden(false);
      } else {
        const isDescendent = descendent(e);
        if (isDescendent) setControllersAreHidden(false);
        else setControllersAreHidden(true);
      }
    };
    window.addEventListener("mousemove", handleControllersShow);

    return () => window.removeEventListener("mousemove", handleControllersShow);
  }, []);

  return (
    <div
      ref={playerControls}
      className={`flex items-end justify-between absolute top-0 left-0 h-full w-full z-10 transition-opacity ${
        controllersAreHidden ? "opacity-0" : "opacity-100"
      }`}
      onMouseMove={fullScreenHidingControllers}
      onClick={handleContainerClick}
    >
      <div
        ref={playMain}
        className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 pointer-events-none"
      >
        <div className="w-full h-full flex justify-center items-center ">
          {play ? (
            <FaPause className="text-slate-50" size="50" />
          ) : (
            <FaPlay className="text-slate-50" size="50" />
          )}
        </div>
      </div>
      <Controllers handleVideoPlay={handleVideoPlay} />
    </div>
  );
};

export default VideoControllers;
