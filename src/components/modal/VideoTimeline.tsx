import React, { useEffect, useRef } from "react";
import useVideoPlayerQuery from "../../store/videoPlayerStore";

const VideoTimeline = () => {
  const timeline = useRef<HTMLDivElement>(null);
  const knobIndicator = useRef<HTMLDivElement>(null);
  const loadedIndicator = useRef<HTMLDivElement>(null);
  const knobTracker = useRef<HTMLDivElement>(null);
  const play = useVideoPlayerQuery((s) => s.videoPlayer.play);
  const controllersAreHidden = useVideoPlayerQuery(
    (s) => s.videoPlayer.controllersAreHidden
  );
  const videoDuration = useVideoPlayerQuery((s) => s.videoPlayer.videoDuration);
  const isScrubbing = useVideoPlayerQuery((s) => s.videoPlayer.isScrubbing);
  const setPlay = useVideoPlayerQuery((s) => s.setPlay);
  const seekTo = useVideoPlayerQuery((s) => s.videoPlayer.seekTo);
  const setIsScrubbing = useVideoPlayerQuery((s) => s.setIsScrubbing);
  const { loadedSeconds, playedSeconds } = useVideoPlayerQuery(
    (s) => s.videoPlayer.videoProgress
  );

  // const [isScrubbing, setIsScrubbing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScrubbing(true);
    handleMouseMove(e);
    const mouseupEvnt = () => {
      setIsScrubbing(false);
      window.removeEventListener("mouseup", mouseupEvnt);
    };
    window.addEventListener("mouseup", mouseupEvnt);
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
  const handleTimelineClick = (e: React.MouseEvent) => {
    setPlay(false);
    const rect = timeline.current?.getBoundingClientRect();
    const timelineX = rect?.x || 0;
    const timelineWidth = rect?.width || 0;
    const cursorX = e.clientX;
    const delta =
      Math.min(Math.max(0, cursorX - timelineX), timelineWidth) / timelineWidth;
    // setIsScrubbing(true);

    console.log("onclick Delta: ", delta);
    const videoTime = videoDuration * delta;
    if (knobIndicator.current) {
      const knobPosition = `${delta * 100}%`;
      knobIndicator.current.style.left = knobPosition;
    }
    if (seekTo) seekTo(videoTime, "seconds");
    // setTimeout(() => setPlay(true), 10);
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
      onClick={handleTimelineClick}
    >
      <div
        ref={timeline}
        className={`flex relative bg-slate-50 bg-opacity-30 w-full h-1 transition-all ${
          isScrubbing && "h-2"
        } group-hover:h-2`}
      >
        <div
          ref={loadedIndicator}
          className="absolute left-0 top-0 bg-slate-50 bg-opacity-60 w-0 h-full z-0"
        ></div>
        <div
          ref={knobTracker}
          className={`absolute left-0 top-0 h-full ${
            play && "transition-all ease-linear duration-1000"
          } w-0  bg-red-500 z-10 `}
        ></div>
        <div
          ref={knobIndicator}
          className={`absolute -top-1/2 h-[200%] left-0 -translate-x-1/2 select-none  bg-red-500 rounded-full scale-0 w-4 origin-center ${
            play && "[transition:transform,left_1s_linear]"
          } ${isScrubbing && "scale-100"} group-hover:scale-100 z-20 `}
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
