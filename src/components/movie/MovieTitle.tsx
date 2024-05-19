import { motion } from "framer-motion";
type Props = {
  title: string | undefined;
  name: string | undefined;
};

const MovieTitle = ({ title, name }: Props) => {
  return (
    <div className="flex-1">
      <motion.h2
        layoutId="movieTitle"
        className="text-slate-50 text-4xl font-main font-semibold"
      >
        {title || name}
      </motion.h2>
    </div>
  );
};

export default MovieTitle;
