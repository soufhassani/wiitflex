import { Movie } from "../../../entities/Movies";
import VideoPlayer from "../../global/videoPLayer/VideoPlayer";

type Props = {
  movie: Movie | undefined;
};

const Video = ({ movie }: Props) => {
  const videoIdx = movie?.videos?.results.findIndex(
    (element) => element.type === "Trailer"
  );
  const videoTrailer = movie?.videos?.results[videoIdx!].key;

  return (
    <>
      <VideoPlayer video={videoTrailer} play={true} mute={false} volume={50} />
    </>
  );
};

export default Video;
