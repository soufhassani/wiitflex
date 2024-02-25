import { FaPause, FaPlay } from "react-icons/fa6";
import { useVideoPlayerQuery } from "../../store/videoPlayerStore";
import Volume from "./Volume";
import { useRef } from "react";

const VideoControllers = () => {
  const playMain = useRef<HTMLDivElement>(null);
  const play = useVideoPlayerQuery((s) => s.videoPlayer.play);
  const setPlay = useVideoPlayerQuery((s) => s.setPlay);
  const controllersAreHidden = useVideoPlayerQuery(
    (s) => s.videoPlayer.controllersAreHidden
  );
  const setControllersAreHidden = useVideoPlayerQuery(
    (s) => s.setControllersAreHidden
  );
  const handleVideoPlay = () => {
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
      handleVideoPlay();
    }
  };
  const handleMouseEnterAndLeave = () => {
    console.log("controllersAreHidden: ", controllersAreHidden);
  };

  return (
    <div
      className={`flex items-end justify-between absolute top-0 left-0 h-full w-full z-10 transition-opacity ${
        controllersAreHidden ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleContainerClick}
      onMouseEnter={(e) => {
        console.log("e.target: ", e.target);
        handleMouseEnterAndLeave();
        setControllersAreHidden(true);
      }}
      // onMouseOut={(e) => {
      //   console.log("Mouse out e.target: ", e.target);
      //   handleMouseEnterAndLeave();
      //   setControllersAreHidden(false);
      // }}
      onMouseLeave={(e) => {
        console.log("Mouse Leave e.target: ", e.target);
        handleMouseEnterAndLeave();
        setControllersAreHidden(false);
      }}
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
      <div className="flex items-center gap-3 h-[60px] w-full px-5">
        <button onClick={handleVideoPlay}>
          {play ? (
            <FaPause className="text-slate-50" />
          ) : (
            <FaPlay className="text-slate-50" />
          )}
        </button>
        <Volume />
      </div>
    </div>
  );
};

export default VideoControllers;
