import useVideoPlayerQuery from "../../store/videoPlayerStore";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FaPause, FaPlay } from "react-icons/fa";
import Volume from "./Volume";
import { useState } from "react";

type Props = {
  handleVideoPlay: (e: React.MouseEvent) => void;
};

const Controllers = ({ handleVideoPlay }: Props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const play = useVideoPlayerQuery((s) => s.videoPlayer.play);

  const handleClickFullscreen = (e: React.MouseEvent) => {
    const container = e.currentTarget.closest(".video-container");
    if (container) {
      container.requestFullscreen();
      setIsFullScreen(true);
    }
  };
  const handleCloseFullscreen = () => {
    document.exitFullscreen();
    setIsFullScreen(false);
  };
  return (
    <div className="flex items-center justify-between h-[60px] w-full px-5">
      <div className="flex items-center gap-3">
        <button onClick={handleVideoPlay}>
          {play ? (
            <FaPause className="text-slate-50" />
          ) : (
            <FaPlay className="text-slate-50" />
          )}
        </button>
        <Volume />
      </div>
      <div>
        <button
          onClick={isFullScreen ? handleCloseFullscreen : handleClickFullscreen}
        >
          <AiOutlineFullscreen size={25} className="text-slate-50" />
        </button>
      </div>
    </div>
  );
};

export default Controllers;
