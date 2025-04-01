import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="relative">
      <div className="h-svh w-full flex flex-col gap-5 justify-center items-center">
        <div className="flex flex-col gap-5">
          <h2 className=" text-main text-3xl">Page Not Found 404</h2>
        </div>
        <div className="flex flex-col items-center gap-20 max-w-[800px]">
          <h4 className="text-main text-8xl text-center">Are you lost?</h4>
          <div className="flex flex-col gap-5 w-full items-center">
            <span>Go back to the</span>
            <Link
              className="w-1/2 flex items-center justify-center gap-2 py-4 px-10 bg-blue-500 rounded-full text-slate-50 font-main font-semibold transition-colors hover:bg-blue-600"
              to="/"
            >
              Home Page
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 z-[-1] w-full h-full">
        <img
          src="/login-wallpaper.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full z-[1]  bg-[rgba(0,0,0,0.7)] "></div>
      </div>
    </section>
  );
};

export default NotFound;
