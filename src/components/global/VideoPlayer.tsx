import React, { useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import VideoControllers from "../modal/modal video/VideoControllers";
import useVideoPlayerQuery from "../../store/videoPlayerStore";
import useMovieQuery from "../../store/movieStore";
import { imagePath } from "../../utils/imagePath";

interface Props {
  video: string;
  play?: boolean;
  mute?: boolean;
  volume?: number;
  controllerAreHidden?: boolean;
  showVolumeRange?: boolean;
  videoProgress?: { loadedSeconds: number; playedSeconds: number };
}

const VideoPlayer = (props: Props) => {
  const {
    video,
    play,
    mute,
    volume,
    videoProgress,
    showVolumeRange,
    controllerAreHidden,
  } = props;
  const [config, setConfig] = useState({
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
    otherMethods: null,
  });
  const [playerMethods, setPlayerMethods] = useState<ReactPlayer>();
  const movie = useMovieQuery((s) => s.selectedMovie);
  //   const play = useVideoPlayerQuery((s) => s.videoPlayer.play);
  //   const mute = useVideoPlayerQuery((s) => s.videoPlayer.mute);
  //   const volume = useVideoPlayerQuery((s) => s.videoPlayer.volumeRange);
  //   const setPlay = useVideoPlayerQuery((s) => s.setPlay);
  //   const setShowVolumeRange = useVideoPlayerQuery((s) => s.setShowVolumeRange);
  //   const setControllersAreHidden = useVideoPlayerQuery(
  //     (s) => s.setControllersAreHidden
  //   );
  //   const setVideoDuration = useVideoPlayerQuery((s) => s.setVideoDuration);
  //   const setSeekTo = useVideoPlayerQuery((s) => s.setSeekTo);
  //   const setVideoProgress = useVideoPlayerQuery((s) => s.setVideoProgress);

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
        playedSeconds: progress.loadedSeconds,
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
      className="aspect-video flex-1 relative overflow-hidden video-container"
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
      <VideoControllers />
    </div>
  );
};

export default VideoPlayer;
