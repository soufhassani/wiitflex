import { create } from "zustand";

interface VideoPlayer {
  play: boolean;
  mute: boolean;
  volumeRange: number;
  showVolumeRange: boolean;
  controllersAreHidden: boolean;
}

interface VideoPlayerQuery {
  videoPlayer: VideoPlayer;
  setPlay: (playState: boolean) => void;
  setMute: (muteState: boolean) => void;
  setVolumeRange: (range: number) => void;
  setShowVolumeRange: (showVolumRangeState: boolean) => void;
  setControllersAreHidden: (isHidden: boolean) => void;
}

export const useVideoPlayerQuery = create<VideoPlayerQuery>((set) => ({
  videoPlayer: {
    play: true,
    mute: false,
    volumeRange: 0.5,
    controllersAreHidden: true,
    showVolumeRange: false,
  },
  setPlay: (playState) =>
    set((s) => ({ videoPlayer: { ...s.videoPlayer, play: playState } })),
  setMute: (muteState) =>
    set((s) => ({ videoPlayer: { ...s.videoPlayer, mute: muteState } })),
  setShowVolumeRange: (showVolumRangeState) =>
    set((s) => ({
      videoPlayer: { ...s.videoPlayer, showVolumeRange: showVolumRangeState },
    })),
  setVolumeRange: (range) =>
    set((s) => ({
      videoPlayer: { ...s.videoPlayer, volumeRange: range },
    })),
  setControllersAreHidden: (isHidden) =>
    set((s) => ({
      videoPlayer: { ...s.videoPlayer, controllersAreHidden: isHidden },
    })),
}));
