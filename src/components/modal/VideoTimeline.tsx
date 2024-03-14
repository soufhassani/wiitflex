import React, { useEffect, useRef, useState } from "react";
import useVideoPlayerQuery from "../../store/videoPlayerStore";

const VideoTimeline = () => {
  const timeline = useRef<HTMLDivElement>(null);
  const knobIndicator = useRef<HTMLDivElement>(null);
  const loadedIndicator = useRef<HTMLDivElement>(null);
  const knobTracker = useRef<HTMLDivElement>(null);
  const controllersAreHidden = useVideoPlayerQuery(
    (s) => s.videoPlayer.controllersAreHidden
  );
  const videoDuration = useVideoPlayerQuery((s) => s.videoPlayer.videoDuration);
  const seekTo = useVideoPlayerQuery((s) => s.videoPlayer.seekTo);
  const { loadedSeconds, playedSeconds } = useVideoPlayerQuery(
    (s) => s.videoPlayer.videoProgress
  );

  const [isScrubbing, setIsScrubbing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScrubbing(true);
    handleMouseMove(e);
    e.currentTarget.addEventListener("mouseup", () => {
      setIsScrubbing(false);
    });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = timeline.current?.getBoundingClientRect();
    const timelineX = rect?.x || 0;
    const timelineWidth = rect?.width || 0;
    const cursorX = e.clientX;

    const delta =
      Math.min(Math.max(0, cursorX - timelineX), timelineWidth) / timelineWidth;

    if (isScrubbing) {
      const videoTime = videoDuration * delta;
      if (seekTo) seekTo(videoTime, "seconds");
      if (knobIndicator.current) {
        const knobPosition = `${delta * 100}%`;
        knobIndicator.current.style.left = knobPosition;
      }
    }
  };

  useEffect(() => {
    const _playedSeconds = (playedSeconds / videoDuration) * 100;
    const _loadedSeconds = (loadedSeconds / videoDuration) * 100;
    if (knobIndicator.current) {
      knobIndicator.current.style.left = `${setToFull(_playedSeconds)}%`;
    }
    if (knobTracker.current)
      knobTracker.current.style.width = `${setToFull(_playedSeconds)}%`;
    if (loadedIndicator.current)
      loadedIndicator.current.style.width = `${setToFull(_loadedSeconds)}%`;
  }, [playedSeconds, loadedSeconds, videoDuration]);
  return (
    <div
      className={` group  w-full h-3 transition-all  ${
        controllersAreHidden ? "my-5" : "my-0"
      }`}
      onMouseMove={handleMouseMove}
    >
      <div
        ref={timeline}
        className="flex relative bg-slate-50 bg-opacity-30 w-full h-1 transition-all group-hover:h-2"
      >
        <div
          ref={loadedIndicator}
          className="absolute left-0 top-0 bg-slate-50 bg-opacity-60 w-0 h-full z-0"
        ></div>
        <div
          ref={knobTracker}
          className={`absolute left-0 top-0 h-full ${
            !isScrubbing && "transition-all ease-linear duration-1000"
          } w-0  bg-red-500 z-10 `}
        ></div>
        <div
          ref={knobIndicator}
          className={`absolute -top-1/2 h-[200%] left-0 -translate-x-1/2 select-none  bg-red-500 rounded-full scale-0 w-4 origin-center ${
            !isScrubbing && "[transition:transform,left_1s_linear]"
          } group-hover:scale-100 z-20`}
          onMouseDown={handleMouseDown}
        ></div>
      </div>
    </div>
  );
};

export default VideoTimeline;

const setToFull = (progress: number) => {
  return progress > 99 ? 100 : progress;
};
