import { useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import VideoControllers from "./VideoControllers";
import useMovieQuery from "../../../store/movieStore";
import { imagePath } from "../../../utils/imagePath";
import { PlayerConfig } from "../../../entities/Player";

interface Props {
  video: string | undefined;
  showMovieDetails: boolean;
  play?: boolean;
  mute?: boolean;
  volume?: number;
  controllerAreHidden?: boolean;
  showVolumeRange?: boolean;
  videoProgress?: { loadedSeconds: number; playedSeconds: number };
}

const VideoPlayer = (props: Props) => {
  const {
    showMovieDetails,
    video,
    play,
    mute,
    volume,
    videoProgress,
    showVolumeRange,
    controllerAreHidden,
  } = props;
  const [config, setConfig] = useState<PlayerConfig>({
    play: play || false,
    mute: mute || false,
    volume: volume || 0,
    controllerAreHidden: controllerAreHidden || false,
    showVolumeRange: showVolumeRange || false,
    videoDuration: 0,
    videoProgress: {
      loadedSeconds: videoProgress?.loadedSeconds || 0,
      playedSeconds: videoProgress?.playedSeconds || 0,
    },
  });
  const [playerMethods, setPlayerMethods] = useState<ReactPlayer>();
  const movie = useMovieQuery((s) => s.selectedMovie);

  const handleMouseLeave = () => {
    setConfig((s) => ({
      ...s,
      controllerAreHidden: true,
      showVolumeRange: false,
    }));
  };

  const handleVideoEnd = () => {
    setConfig((s) => ({ ...s, play: false, controllerAreHidden: false }));
  };
  const handleProgress = (progress: OnProgressProps) => {
    setConfig((s) => ({
      ...s,
      videoProgress: {
        loadedSeconds: progress.loadedSeconds,
        playedSeconds: progress.playedSeconds,
      },
    }));
  };

  const handleOnDuration = (duration: number) => {
    setConfig((s) => ({ ...s, videoDuration: duration }));
  };

  const handleOnReady = (player: ReactPlayer) => {
    setPlayerMethods(player);
  };

  return (
    <div
      className={`${
        showMovieDetails ? "aspect-video" : "aspect-square"
      } basis-1/2 relative overflow-hidden video-container md:aspect-video md:basis-full`}
      onMouseLeave={handleMouseLeave}
    >
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${video}&showinfo=0&controls=0&modestbranding=1&rel=0`}
        fallback={
          <img src={imagePath + (movie?.backdrop_path || movie?.poster_path)} />
        }
        width="100%"
        height="100%"
        playing={config.play}
        muted={config.mute}
        volume={config.volume / 100}
        onReady={handleOnReady}
        onProgress={handleProgress}
        onEnded={handleVideoEnd}
        onDuration={handleOnDuration}
      />
      <VideoControllers
        playerConfig={config}
        playerMethods={playerMethods}
        setPlayerConfig={setConfig}
      />
    </div>
  );
};

export default VideoPlayer;
