import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import { FaPlay, FaVolumeOff } from "react-icons/fa6";
import { FaVolumeMute } from "react-icons/fa";
import { imagePath } from "../../utils/imagePath";
import { Movie } from "../../entities/Movies";
import VolumeRange from "./VolumeRange";
import Volume from "./Volume";
import { useVideoPlayerQuery } from "../../store/videoPlayerStore";
import VideoControllers from "./VideoControllers";

type Props = {
  movie: Movie | undefined;
};

const Video = ({ movie }: Props) => {
  const play = useVideoPlayerQuery((s) => s.videoPlayer.play);
  const mute = useVideoPlayerQuery((s) => s.videoPlayer.mute);

  const videoIdx =
    movie?.videos?.results.findIndex((element) => element.type === "Trailer") ||
    0;
  const videoTrailer = movie?.videos?.results[videoIdx].key;

  return (
    <div className="aspect-video flex-1 relative overflow-hidden ">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoTrailer}&showinfo=0&controls=0&modestbranding=1&rel=0`}
        fallback={
          <img src={imagePath + (movie?.backdrop_path || movie?.poster_path)} />
        }
        width="100%"
        height="100%"
        playing={play}
        muted={mute}
        onProgress={(state) => console.log("State: ", state)}
      />
      <VideoControllers />
    </div>
  );
};

export default Video;
