import BackgroundImage from "./BackgroundImage";
import HeroDetails from "./HeroDetails";

const Hero = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="pointer-events-none select-none h-full w-full">
        <BackgroundImage />
      </div>
      <HeroDetails />
    </div>
  );
};

export default Hero;
