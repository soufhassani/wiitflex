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
      <img src={imagePath + (movie?.backdrop_path || movie?.poster_path)} />
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
