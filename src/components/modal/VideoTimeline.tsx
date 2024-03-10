import React, { useEffect, useRef } from "react";
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
  const handleMouseDown = (e: React.MouseEvent) => {
    let timelineWidth = 0;
    const pointer = { x: e.clientX };
    if (timeline.current)
      timelineWidth = timeline.current.getBoundingClientRect().width;
    const knobWidth = knobIndicator.current?.style.left.split("%")[0];
    const width = Number(knobWidth);

    /*** stopped here */
    const setIsScrubbing = false;
    // const getPercentage = (width / timelineWidth) * 100;
    // console.log("width: ", width);
    // console.log("pointer: ", pointer.x);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    let timelineX = 0;
    let timelineWidth = 0;
    let timelineLeft = 0;
    const cursorX = e.clientX;
    if (timeline.current) {
      const rect = timeline.current.getBoundingClientRect();
      timelineX = rect.x;
      timelineWidth = rect.width;
      timelineLeft = timeline.current.getBoundingClientRect().left;
    }

    const delta =
      Math.min(Math.max(0, cursorX - timelineX), timelineWidth) / timelineWidth;
    const percentage = delta * 100;
    // const knobWidth = knobIndicator.current?.style.left.split("%")[0];
    // const width = Number(knobWidth);

    // const getPercentage = (width / timelineWidth) * 100;
    // console.log("timelineWidth: ", timelineWidth);
    // console.log("timelineLeft: ", timelineLeft);
    console.log("percentage: ", percentage);
  };
  //   if (seekTo) seekTo(50, "seconds");
  useEffect(() => {
    const _playedSeconds = (playedSeconds / videoDuration) * 100;
    const _loadedSeconds = (loadedSeconds / videoDuration) * 100;
    console.log(
      "(playedSeconds / videoDuration) * 100: ",
      (playedSeconds / videoDuration) * 100
    );
    if (knobIndicator.current) {
      knobIndicator.current.style.left = `${
        _playedSeconds > 99 ? 100 : _playedSeconds
      }%`;
    }
    if (knobTracker.current)
      knobTracker.current.style.width = `${
        _playedSeconds > 99 ? 100 : _playedSeconds
      }%`;
    if (loadedIndicator.current)
      loadedIndicator.current.style.width = `${
        _loadedSeconds > 99 ? 100 : _loadedSeconds
      }%`;
  }, [playedSeconds, loadedSeconds, videoDuration]);
  console.log("videoProgress", playedSeconds);
  //   const indicatorTransform = "-translate-x-1/2" + "scale-100";
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
          className="absolute left-0 top-0 h-full transition-all w-0 duration-1000 ease-linear bg-red-500 z-10 "
        ></div>
        <div
          ref={knobIndicator}
          className="absolute -top-1/2 h-[200%] left-0 -translate-x-1/2  bg-red-500 rounded-full scale-0 w-4 origin-center [transition:transform,left_1s_linear] group-hover:scale-100 z-20"
          onMouseDown={handleMouseDown}
        ></div>
      </div>
    </div>
  );
};

export default VideoTimeline;
