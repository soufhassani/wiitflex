import { AxiosError } from "axios";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  let errors: { message: string; status: number } | null = null;
  console.log("error Error apge: ", error);
  if (isRouteErrorResponse(error)) {
    errors = { message: error?.data.message, status: Number(error.statusText) };
  } else if (error instanceof AxiosError) {
    console.log("error Error apge1: ", error.response?.status);
    errors = { message: error.message, status: error.response?.status || 500 };
  } else if (error instanceof Error) {
    errors = { message: error.message, status: 500 };
  } else if (typeof error === "string") {
    errors = { message: error, status: 500 };
  } else {
    console.error(error);
    errors = { message: "Unknown error has been occurred", status: 500 };
  }

  // console.clear();
  return (
    <div className="w-full h-svh flex items-center justify-center flex-col gap-4">
      <h2 className="text-3xl font-main font-semibold text-slate-50">
        Oops! Something went wrong.
      </h2>
      <p className="text-slate-50">
        {errors.status === 404
          ? "Movie or Tv-show not Found"
          : "Unknown error has been occurred"}
      </p>
      <div className="flex flex-col gap-5 w-full items-center">
        <span>Go back to the</span>
        <Link
          className="w-1/2 flex items-center justify-center gap-2 py-2 px-5 bg-blue-500 rounded-full text-slate-50 font-main font-semibold transition-colors hover:bg-blue-600 lg:py-4 lg:px-10"
          to="/"
        >
          Home Page
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
