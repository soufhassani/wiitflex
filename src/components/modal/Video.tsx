import ReactPlayer from "react-player";
import { imagePath } from "../../utils/imagePath";
import { Movie } from "../../entities/Movies";
import useVideoPlayerQuery from "../../store/videoPlayerStore";
import VideoControllers from "./VideoControllers";
import { OnProgressProps } from "react-player/base";

type Props = {
  movie: Movie | undefined;
};

const Video = ({ movie }: Props) => {
  const play = useVideoPlayerQuery((s) => s.videoPlayer.play);
  const mute = useVideoPlayerQuery((s) => s.videoPlayer.mute);
  const volume = useVideoPlayerQuery((s) => s.videoPlayer.volumeRange);
  const setPlay = useVideoPlayerQuery((s) => s.setPlay);
  const setShowVolumeRange = useVideoPlayerQuery((s) => s.setShowVolumeRange);
  const setControllersAreHidden = useVideoPlayerQuery(
    (s) => s.setControllersAreHidden
  );
  const setVideoDuration = useVideoPlayerQuery((s) => s.setVideoDuration);
  const setSeekTo = useVideoPlayerQuery((s) => s.setSeekTo);
  const setVideoProgress = useVideoPlayerQuery((s) => s.setVideoProgress);

  const videoIdx =
    movie?.videos?.results.findIndex((element) => element.type === "Trailer") ||
    0;
  const videoTrailer = movie?.videos?.results[videoIdx].key;

  const handleMouseLeave = () => {
    setControllersAreHidden(true);
    setShowVolumeRange(false);
  };

  const handleVideoEnd = () => {
    setPlay(false);
    setControllersAreHidden(false);
  };
  const handleProgress = (progress: OnProgressProps) => {
    setVideoProgress({
      loadedSeconds: progress.loadedSeconds,
      playedSeconds: progress.playedSeconds,
    });
  };
  const handleOnDuration = (duration: number) => {
    console.log("duration:", duration);
    setVideoDuration(duration);
  };
  const handleOnReady = (player: ReactPlayer) => {
    console.log("player:", player);
    setSeekTo(player.seekTo);
    // player.seekTo(30, "seconds");
  };
  return (
    <div
      className="aspect-video flex-1 relative overflow-hidden video-container"
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
        // muted={mute}
        muted={true}
        volume={volume / 100}
        onReady={handleOnReady}
        onEnded={handleVideoEnd}
        onProgress={handleProgress}
        onDuration={handleOnDuration}
      />
      <VideoControllers />
    </div>
  );
};

export default Video;
