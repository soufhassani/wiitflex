import { useState } from "react";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FaPause, FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";
import { PlayerConfig } from "../../../entities/Player";
import VideoTimeline from "./VideoTimeline";
import Volume from "./Volume";

type Props = {
  playerConfig: PlayerConfig;
  playerMethods: ReactPlayer | undefined;
  scrubbingConfig: {
    isScrubbing: boolean | undefined;
    setIsScrubbing: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  };
  setPlayerConfig: React.Dispatch<React.SetStateAction<PlayerConfig>>;
  handleVideoPlay: (e: React.MouseEvent) => void;
};

const Controllers = (props: Props) => {
  const {
    playerConfig,
    playerMethods,
    setPlayerConfig,
    handleVideoPlay,
    scrubbingConfig,
  } = props;
  const [isFullScreen, setIsFullScreen] = useState(false);

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
    <div className="w-full px-5">
      <VideoTimeline
        playerConfig={playerConfig}
        playerMethods={playerMethods}
        setPlayerConfig={setPlayerConfig}
        scrubbingConfig={scrubbingConfig}
      />
      <div
        className={`flex items-center justify-between  w-full transition-all ${
          playerConfig.controllerAreHidden
            ? "opacity-0 translate-y-full h-0 pointer-events-none"
            : "opacity-100 h-[60px]"
        }`}
      >
        <div className="flex items-center gap-3">
          <button onClick={handleVideoPlay}>
            {playerConfig.play ? (
              <FaPause className="text-slate-50" />
            ) : (
              <FaPlay className="text-slate-50" />
            )}
          </button>
          <Volume
            playerConfig={playerConfig}
            setPlayerConfig={setPlayerConfig}
          />
        </div>

        <div>
          <button
            onClick={
              isFullScreen ? handleCloseFullscreen : handleClickFullscreen
            }
          >
            <AiOutlineFullscreen size={25} className="text-slate-50" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controllers;
