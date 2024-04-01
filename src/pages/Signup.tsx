import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <section className="relative">
      <div className="absolute top-0 left-0 z-[-1] w-full h-full">
        <img
          src="/login-wallpaper.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full z-[1]  bg-[rgba(0,0,0,0.7)] "></div>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <form className="max-w-[500px] w-full flex flex-col gap-5 bg-neutral-950 p-5 rounded-3xl shadow-2xl">
          <div>
            <h2 className="text-slate-50 font-main text-4xl font-semibold">
              Sign-up
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-slate-50 font-main" htmlFor="username">
              Username
            </label>
            <input
              className="py-3 rounded-full indent-3"
              id="username"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-slate-50 font-main" htmlFor="fullname">
              Full name
            </label>
            <input
              className="py-3 rounded-full indent-3"
              id="fullname"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-slate-50 font-main" htmlFor="email">
              E-mail
            </label>
            <input
              className="py-3 rounded-full indent-3"
              id="email"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-slate-50 font-main" htmlFor="password">
              Password
            </label>
            <input
              className="py-3 rounded-full indent-3"
              id="password"
              type="password"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              className="text-slate-50 font-main"
              htmlFor="confirmationPass"
            >
              Confirme your password
            </label>
            <input
              className="py-3 rounded-full indent-3"
              id="confirmationPass"
              type="password"
            />
          </div>
          <div className="mt-5 pr-2 flex items-center justify-between ">
            <button className=" py-3 px-12 bg-red-500 rounded-full text-slate-50 font-main font-semibold hover:bg-red-600">
              Sign-in
            </button>
            <h4>
              Already have an account ?{" "}
              <Link
                className="text-red-300 hover:text-red-400 transition-colors"
                to="/sign-up"
              >
                Log-in
              </Link>
            </h4>
          </div>
          <div>
            <p>
              <b>Note:</b> Your data will be save for 30days
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
