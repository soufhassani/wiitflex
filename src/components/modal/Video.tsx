import ReactPlayer from "react-player";
import { imagePath } from "../../utils/imagePath";
import { Movie } from "../../entities/Movies";
import { useVideoPlayerQuery } from "../../store/videoPlayerStore";
import VideoControllers from "./VideoControllers";

type Props = {
  movie: Movie | undefined;
};

const Video = ({ movie }: Props) => {
  const play = useVideoPlayerQuery((s) => s.videoPlayer.play);
  const mute = useVideoPlayerQuery((s) => s.videoPlayer.mute);
  const setShowVolumRange = useVideoPlayerQuery((s) => s.setShowVolumRange);

  const videoIdx =
    movie?.videos?.results.findIndex((element) => element.type === "Trailer") ||
    0;
  const videoTrailer = movie?.videos?.results[videoIdx].key;

  const handleMouseLeave = () => {
    setShowVolumRange(false);
  };

  return (
    <div
      className="aspect-video flex-1 relative overflow-hidden"
      onMouseLeave={handleMouseLeave}
    >
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
