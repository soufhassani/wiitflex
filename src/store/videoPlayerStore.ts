import { create } from "zustand";

interface VideoPlayer {
  play: boolean;
  mute: boolean;
  playerState: boolean;
  showVolumRange: boolean;
}

interface VideoPlayerQuery {
  videoPlayer: VideoPlayer;
  setPlay: (playState: boolean) => void;
  setMute: (muteState: boolean) => void;
  setShowVolumRange: (showVolumRangeState: boolean) => void;
  setPlayerState: (playerState: boolean) => void;
}

export const useVideoPlayerQuery = create<VideoPlayerQuery>((set) => ({
  videoPlayer: {
    play: true,
    mute: false,
    playerState: false,
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
  setPlayerState: (playerState) =>
    set((s) => ({
      videoPlayer: { ...s.videoPlayer, playerState: playerState },
    })),
}));