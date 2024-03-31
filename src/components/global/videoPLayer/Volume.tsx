import { FaVolumeOff } from "react-icons/fa6";
import { FaVolumeMute } from "react-icons/fa";
import VolumeRange from "./VolumeRange";
import { PlayerConfig } from "../../../entities/Player";

type Props = {
  playerConfig: PlayerConfig;
  setPlayerConfig: React.Dispatch<React.SetStateAction<PlayerConfig>>;
};

const Volume = ({ playerConfig, setPlayerConfig }: Props) => {
  const mute = playerConfig.mute;

  const handleVolumeMouseOver = () => {
    setPlayerConfig((s) => ({ ...s, showVolumeRange: true }));
  };
  return (
    <div className="flex gap-2" onMouseOver={handleVolumeMouseOver}>
      <button onClick={() => setPlayerConfig((s) => ({ ...s, mute: !mute }))}>
        {mute ? (
          <FaVolumeMute className="text-slate-50" />
        ) : (
          <FaVolumeOff className="text-slate-50" />
        )}
      </button>
      <div
        className={`w-20 {
          showVolumeRange
            ? "visible pointer-events-auto	"
            : "invisible pointer-events-none"
        }`}
      >
        <VolumeRange
          playerConfig={playerConfig}
          setPlayerConfig={setPlayerConfig}
        />
      </div>
    </div>
  );
};

export default Volume;
