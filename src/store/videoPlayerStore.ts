import { create } from "zustand";

interface VideoPlayer {
  play: boolean;
  mute: boolean;
  controllersAreHidden: boolean;
  showVolumRange: boolean;
}

interface VideoPlayerQuery {
  videoPlayer: VideoPlayer;
  setPlay: (playState: boolean) => void;
  setMute: (muteState: boolean) => void;
  setShowVolumRange: (showVolumRangeState: boolean) => void;
  setControllersAreHidden: (isHidden: boolean) => void;
}

export const useVideoPlayerQuery = create<VideoPlayerQuery>((set) => ({
  videoPlayer: {
    play: true,
    mute: false,
    controllersAreHidden: true,
    showVolumRange: false,
  },
  setPlay: (playState) =>
    set((s) => ({ videoPlayer: { ...s.videoPlayer, play: playState } })),
  setMute: (muteState) =>
    set((s) => ({ videoPlayer: { ...s.videoPlayer, mute: muteState } })),
  setShowVolumRange: (showVolumRangeState) =>
    set((s) => ({
      videoPlayer: { ...s.videoPlayer, showVolumRange: showVolumRangeState },
    })),
  setControllersAreHidden: (isHidden) =>
    set((s) => ({
      videoPlayer: { ...s.videoPlayer, controllersAreHidden: isHidden },
    })),
}));
