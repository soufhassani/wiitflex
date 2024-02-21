import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import { FaPlay, FaVolumeOff } from "react-icons/fa6";
import { FaVolumeMute } from "react-icons/fa";
import { imagePath } from "../../utils/imagePath";
import { Movie } from "../../entities/Movies";

type Props = {
  movie: Movie | undefined;
};

const Video = ({ movie }: Props) => {
  const [play, setPlay] = useState(true);
  const [mute, setMute] = useState(false);
  const location = window.location.href;
  console.log(location);
  const videoIdx =
    movie?.videos?.results.findIndex((element) => element.type === "Trailer") ||
    0;
  const videoTrailer = movie?.videos?.results[videoIdx].key;

  useEffect(() => {}, []);

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
        className=" [&.ytp-chrome-top]:hidden"
      />
      <div className=" flex gap-3 items-center absolute bottom-0 left-0 h-[60px] w-full px-5 z-10">
        <button onClick={() => setPlay(!play)}>
          <FaPlay className="text-slate-50" />
        </button>
        <button onClick={() => setMute(!mute)}>
          {mute ? (
            <FaVolumeMute className="text-slate-50" />
          ) : (
            <FaVolumeOff className="text-slate-50" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Video;
