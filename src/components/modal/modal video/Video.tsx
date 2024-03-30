import ReactPlayer from "react-player";
import { imagePath } from "../../../utils/imagePath";
import { Movie } from "../../../entities/Movies";
import useVideoPlayerQuery from "../../../store/videoPlayerStore";
import VideoControllers from "./VideoControllers";
import { OnProgressProps } from "react-player/base";

type Props = {
  movie: Movie | undefined;
  type: "trailer" | null;
  isPaused?: boolean;
  videoKey?: string;
};

const Video = ({ movie, type, videoKey, isPaused }: Props) => {
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

  let videoIdx = null;
  if (type === "trailer")
    videoIdx = movie?.videos?.results.findIndex(
      (element) => element.type === "Trailer"
    );
  const videoTrailer = videoIdx
    ? movie?.videos?.results[videoIdx].key
    : videoKey;

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
    setVideoDuration(duration);
  };

  const handleOnReady = (player: ReactPlayer) => {
    setSeekTo(player.seekTo);
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
        playing={isPaused ? false : play}
        muted={mute}
        volume={volume / 100}
        onReady={handleOnReady}
        onProgress={handleProgress}
        onEnded={handleVideoEnd}
        onDuration={handleOnDuration}
      />
      {/* <VideoControllers /> */}
    </div>
  );
};

export default Video;
