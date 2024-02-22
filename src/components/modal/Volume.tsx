import React, { useState } from "react";
import { FaVolumeOff } from "react-icons/fa6";
import { FaVolumeMute } from "react-icons/fa";
import VolumeRange from "./VolumeRange";
import { useVideoPlayerQuery } from "../../store/videoPlayerStore";

const Volume = () => {
  const mute = useVideoPlayerQuery((s) => s.videoPlayer.mute);
  const setMute = useVideoPlayerQuery((s) => s.setMute);
  const showVolumRange = useVideoPlayerQuery(
    (s) => s.videoPlayer.showVolumRange
  );
  const setShowVolumRange = useVideoPlayerQuery((s) => s.setShowVolumRange);

  const handleVolumeMouseOver = () => {
    setShowVolumRange(true);
  };
  return (
    <div className="flex gap-2" onMouseOver={handleVolumeMouseOver}>
      <button onClick={() => setMute(!mute)}>
        {mute ? (
          <FaVolumeMute className="text-slate-50" />
        ) : (
          <FaVolumeOff className="text-slate-50" />
        )}
      </button>
      <div
        className={
          showVolumRange
            ? "w-20 visible pointer-events-auto	"
            : "w-0 invisible pointer-events-none"
        }
      >
        <VolumeRange />
      </div>
    </div>
  );
};

export default Volume;
