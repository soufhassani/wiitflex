import { Movie } from "../../../entities/Movies";
import { imagePath } from "../../../utils/imagePath";
import VideoPlayer from "../../global/videoPLayer/VideoPlayer";

type Props = {
  movie: Movie | undefined;
};

const Video = ({ movie }: Props) => {
  const videoIdx = movie!.videos!.results.findIndex(
    (element) => element.type === "Trailer"
  );
  if (videoIdx < 0)
    return (
      <div className="relative">
        <img src={imagePath + (movie?.backdrop_path || movie?.poster_path)} />
        <h2 className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-main text-3xl text-center ">
          There is no trailer available for this movie... .
        </h2>
      </div>
    );

  console.log("videoIdx: ", videoIdx);
  console.log("video: ", movie?.videos?.results[videoIdx]);
  const videoTrailer = movie?.videos?.results[videoIdx].key;

  return (
    <>
      <VideoPlayer video={videoTrailer} play={true} mute={false} volume={50} />
    </>
  );
};

export default Video;
