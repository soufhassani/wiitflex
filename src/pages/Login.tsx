import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section>
      <div className="min-h-screen flex items-center justify-center">
        <form className="max-w-[500px] w-full flex flex-col gap-5">
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
            <label className="text-slate-50 font-main" htmlFor="password">
              Password
            </label>
            <input
              className="py-3 rounded-full indent-3"
              id="password"
              type="password"
            />
          </div>
          <div className="mt-5 flex items-center justify-between">
            <button className=" py-3 px-12 bg-red-500 rounded-full text-slate-50 font-main font-semibold hover:bg-red-600">
              Log in
            </button>
            <span>
              You don't have an account ?{" "}
              <Link
                className="text-red-300 hover:text-red-400 transition-colors"
                to="/sign-up"
              >
                Create yours now
              </Link>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
