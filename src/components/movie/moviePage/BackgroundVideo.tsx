import { useState } from "react";
import ReactPlayer from "react-player";
import useMovieQuery from "../../../store/movieStore";
import { imagePath } from "../../../utils/imagePath";
import BackgroundImage from "./BackgroundImage";

const BackgroundVideo = () => {
  const movie = useMovieQuery((s) => s.selectedMovie);
  const [videoLoading, setVideoLoading] = useState(false);
  const videoIdx =
    movie?.videos?.results.findIndex((element) => element.type === "Trailer") ||
    0;
  const videoTrailer = movie?.videos?.results[videoIdx].key;
  const handleReady = () => {
    setVideoLoading(true);
  };
  return (
    <>
      <div className="bg-videoGradient absolute z-10 h-full w-full"></div>
      <div className="aspect-video relative overflow-hidden w-full h-full  ">
        <ReactPlayer
          className="-mt-10"
          url={`https://www.youtube.com/watch?v=${videoTrailer}&showinfo=0&controls=0&modestbranding=1&rel=0`}
          fallback={
            <img
              src={imagePath + (movie?.backdrop_path || movie?.poster_path)}
            />
          }
          width="100%"
          height="100%"
          playing={true}
          muted={true}
          volume={0}
          loop={true}
          controls={false}
          onReady={handleReady}
        />
        {!videoLoading ? <BackgroundImage /> : ""}
      </div>
    </>
  );
};

export default BackgroundVideo;
