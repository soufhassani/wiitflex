import { imagePath } from "../../../utils/imagePath";
type Props = {
  image: string;
};

const MoviePageBgImage = ({ image }: Props) => {
  const imageP = imagePath + image;
  return (
    <>
      <div className="bg-gradient-to-t from-[#0f0f0f] to-transparent absolute h-full w-full pointer-events-none select-none"></div>
      <img
        src={imageP}
        className="h-full w-full object-cover object-top pointer-events-none select-none"
      />
    </>
  );
};

export default MoviePageBgImage;
