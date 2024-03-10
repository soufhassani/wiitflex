import { create } from "zustand";

interface VideoProgress{
  loadedSeconds: number;
  playedSeconds: number
}
interface VideoPlayer {
  play: boolean;
  mute: boolean;
  volumeRange: number;
  showVolumeRange: boolean;
  controllersAreHidden: boolean;
  videoDuration: number;
  videoProgress: VideoProgress
  seekTo: ((to:number, type?: "seconds"|"fraction") => void) | null
  
}

interface VideoPlayerQuery {
  videoPlayer: VideoPlayer;
  setPlay: (playState: boolean) => void;
  setMute: (muteState: boolean) => void;
  setVolumeRange: (range: number) => void;
  setShowVolumeRange: (showVolumeRangeState: boolean) => void;
  setControllersAreHidden: (isHidden: boolean) => void;
  setVideoDuration: (duration: number) => void;
  setSeekTo: (seekTo: (to:number, type?: "seconds"|"fraction") => void) => void;
  setVideoProgress: (progress:VideoProgress) => void
  
}

const useVideoPlayerQuery = create<VideoPlayerQuery>((set) => ({
  videoPlayer: {
    play: true,
    mute: false,
    volumeRange: 50,
    controllersAreHidden: true,
    showVolumeRange: false,
    videoDuration: 0,
    seekTo:null,
    videoProgress: { loadedSeconds: 0, playedSeconds: 0}
  },
  setPlay: (playState) =>
    set((s) => ({ videoPlayer: { ...s.videoPlayer, play: playState } })),
  setMute: (muteState) =>
    set((s) => ({ videoPlayer: { ...s.videoPlayer, mute: muteState } })),
  setShowVolumeRange: (showVolumeRangeState) =>
    set((s) => ({
      videoPlayer: { ...s.videoPlayer, showVolumeRange: showVolumeRangeState },
    })),
  setVolumeRange: (range) =>
    set((s) => ({
      videoPlayer: { ...s.videoPlayer, volumeRange: range },
    })),
  setControllersAreHidden: (isHidden) =>
    set((s) => ({
      videoPlayer: { ...s.videoPlayer, controllersAreHidden: isHidden },
    })),
  setVideoDuration: (duration) =>
    set((s) => ({
      videoPlayer: { ...s.videoPlayer, videoDuration: duration },
    })),
    setSeekTo: (seekTo) =>
    set((s) => ({
      videoPlayer: { ...s.videoPlayer, seekTo: seekTo },
    })),
    setVideoProgress: (progress) =>
    set((s) => ({
      videoPlayer: { ...s.videoPlayer, videoProgress: progress },
    })),
  
}));

export default useVideoPlayerQuery