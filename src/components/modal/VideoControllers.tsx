import { FaPlay } from "react-icons/fa6";
import { useVideoPlayerQuery } from "../../store/videoPlayerStore";
import Volume from "./Volume";

const VideoControllers = () => {
  const play = useVideoPlayerQuery((s) => s.videoPlayer.play);
  const setPlay = useVideoPlayerQuery((s) => s.setPlay);
  return (
    <div className="flex items-end absolute top-0 left-0 h-full w-full z-10">
      <div className="flex items-center gap-3 h-[60px] w-full px-5">
        <button onClick={() => setPlay(!play)}>
          <FaPlay className="text-slate-50" />
        </button>
        <Volume />
      </div>
    </div>
  );
};

export default VideoControllers;
