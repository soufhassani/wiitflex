import { FaPause, FaPlay } from "react-icons/fa6";
import ReactPlayer from "react-player";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useVideoPlayerQuery from "../../../store/videoPlayerStore";
import Controllers from "./Controllers";
import { PlayerConfig } from "../../../entities/Player";

interface Props {
  playerConfig: PlayerConfig;
  playerMethods: ReactPlayer | undefined;
  setPlayerConfig: React.Dispatch<React.SetStateAction<PlayerConfig>>;
}

const VideoControllers = ({
  playerConfig,
  playerMethods,
  setPlayerConfig,
}: Props) => {
  const { play } = playerConfig;
  const [isScrubbing, setIsScrubbing] = useState<boolean>();
  const playerControls = useRef<HTMLDivElement>(null);
  const playMain = useRef<HTMLDivElement>(null);
  // const play = useVideoPlayerQuery((s) => s.videoPlayer.play);
  // const setPlay = useVideoPlayerQuery((s) => s.setPlay);
  // const isScrubbing = useVideoPlayerQuery((s) => s.videoPlayer.isScrubbing);

  const setControllersAreHidden = useVideoPlayerQuery(
    (s) => s.setControllersAreHidden
  );
  const handleVideoPlay = (e: React.MouseEvent) => {
    fullScreenHidingControllers(e);
    setPlayerConfig((s) => ({ ...s, play: !play }));

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
      // setControllersAreHidden(false);
      setPlayerConfig((s) => ({ ...s, controllerAreHidden: false }));
      clearTimeout(timeoutId.current);
      if (isScrubbing) return;
      if (e.target === playerControls.current) {
        timeoutId.current = setTimeout(
          () => setPlayerConfig((s) => ({ ...s, controllerAreHidden: true })),
          4000
        );
      }
    },
    [setPlayerConfig, isScrubbing]
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
        setPlayerConfig((s) => ({ ...s, controllerAreHidden: false }));
      } else {
        const isDescendent = descendent(e);
        if (isDescendent)
          setPlayerConfig((s) => ({ ...s, controllerAreHidden: false }));
        else if (isScrubbing)
          setPlayerConfig((s) => ({ ...s, controllerAreHidden: false }));
        else setPlayerConfig((s) => ({ ...s, controllerAreHidden: true }));
      }
    };
    window.addEventListener("mousemove", handleControllersShow);

    return () => window.removeEventListener("mousemove", handleControllersShow);
  }, [setPlayerConfig, isScrubbing]);

  return (
    <div
      ref={playerControls}
      className="flex items-end justify-between absolute top-0 left-0 h-full w-full z-10 transition-opacity"
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
      <Controllers
        playerConfig={playerConfig}
        playerMethods={playerMethods}
        setPlayerConfig={setPlayerConfig}
        handleVideoPlay={handleVideoPlay}
        scrubbingConfig={{ isScrubbing, setIsScrubbing }}
      />
    </div>
  );
};

export default VideoControllers;
