import { FaPause, FaPlay } from "react-icons/fa6";
import { useVideoPlayerQuery } from "../../store/videoPlayerStore";
import Volume from "./Volume";
import { useState } from "react";

const VideoControllers = () => {
  const [hide, setHide] = useState(false);
  const play = useVideoPlayerQuery((s) => s.videoPlayer.play);
  const setPlay = useVideoPlayerQuery((s) => s.setPlay);
  const handleVideoPlay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setHide(!hide);
      setPlay(!play);
    }
  };
  return (
    <div
      className="flex items-end absolute top-0 left-0 h-full w-full z-10"
      onClick={(e) => handleVideoPlay}
    >
      <div
        className={`absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 transition-opacity ${
          hide ? "opacity-0" : "opacity-100"
        }`}
      >
        {play ? (
          <FaPlay className="text-slate-50" size="50" />
        ) : (
          <FaPause className="text-slate-50" size="50" />
        )}
      </div>
      <div className="flex items-center gap-3 h-[60px] w-full px-5">
        <button onClick={() => setPlay(!play)}>
          <FaPlay className="text-slate-50" />
        </button>
        <Volume />
      </div>
    </div>
  );
};

export default VideoControllers;
