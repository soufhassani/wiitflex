import { motion } from "framer-motion";

type Props = {
  title: string;
};

const MovieDetail = ({ title }: Props) => {
  return (
    <div className="absolute bottom-12 left-0 w-full px-10 flex justify-between z-20">
      <div className="flex flex-col justify-end">
        <motion.h2
          layoutId="movieTitle"
          className="uppercase font-main font-bold text-slate-50 text-3xl mb-9 "
        >
          {title}
        </motion.h2>
        <div className="flex flex-col gap-1">
          <div className="flex gap-3  ">
            <span className="text-slate-50">Original title:</span>
            <span className="text-slate-300 w-28 bg-gray-400 h-full rounded-full animate-pulse "></span>
          </div>
          <div className="flex gap-3  ">
            <span className="text-slate-50">Original Language:</span>
            <span className="text-slate-300 w-24 bg-gray-500 h-full rounded-full animate-pulse "></span>
          </div>
          <div className="flex gap-3  ">
            <span className="text-slate-50">Released date: </span>
            <span className="text-slate-300 w-20 bg-gray-400 h-full rounded-full animate-pulse "></span>
          </div>
        </div>
      </div>
      <div className="flex items-end gap-20">
        <div className="flex flex-col gap-3">
          <h4 className="text-2xl font-semibold font-main">Rating</h4>
          <div className="text-3xl font-bold leading-8 w-60 h-14 rounded-full bg-gray-400 animate-pulse"></div>
        </div>
        <div className="">
          <div className="w-[250px] h-14  rounded-full py-3 px-6 bg-gray-500 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
