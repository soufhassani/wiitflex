import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex items-end pb-1 gap-1 w-f">
      <Link to={"/"}>
        <h3 className="text-slate-50 mb-[-4px] text-2xl uppercase font-main font-bold">
          wiitflix
        </h3>
      </Link>
      <div className="w-[6px] h-[6px] rounded-full bg-slate-50"></div>
    </div>
  );
};

export default Logo;
