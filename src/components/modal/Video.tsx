import React from "react";
import ReactPlayer from "react-player";
import { imagePath } from "../../utils/imagePath";
import { Movie } from "../../entities/Movies";
type Props = {
  movie: Movie | undefined;
};

const Video = ({ movie }: Props) => {
  const videoIdx =
    movie?.videos?.results.findIndex((element) => element.type === "Trailer") ||
    0;
  const videoTrailer = movie?.videos?.results[videoIdx].key;
  return (
    <div className="aspect-video flex-1">
      <ReactPlayer
        url={`https://www.youtube.com/embed/${videoTrailer}`}
        fallback={
          <img src={imagePath + (movie?.backdrop_path || movie?.poster_path)} />
        }
        width="100%"
        height="100%"
        playing
        onProgress={(state) => console.log("State: ", state)}
      />
    </div>
  );
};

export default Video;
