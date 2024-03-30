export type PlayerConfig={
    play: boolean;
    mute: boolean;
    volume: number;
    controllerAreHidden: boolean;
    showVolumeRange: boolean;
    videoDuration: number;
    videoProgress: {
        loadedSeconds: number;
        playedSeconds: number;
    };
}
