import React from "react";
import useMovieQuery from "../../../store/movieStore";
import { imagePath } from "../../../utils/imagePath";

const Overview = () => {
  const selectedMovie = useMovieQuery((s) => s.selectedMovie);
  return (
    <section className="py-20 px-10">
      <div className="">
        <h3 className="font-main text-4xl font-semibold ">Overview</h3>
        <p className="text-slate-50 text-xl">{selectedMovie.overview}</p>
      </div>
      <div className="">
        <h3 className="font-main text-4xl font-semibold ">
          Production Companies
        </h3>
        <p className="text-slate-50 text-xl"></p>
        {selectedMovie.production_companies?.map((company) => (
          <div key={company.id}>
            <div className="bg-slate-50  flex ">
              <img
                src={imagePath + company.logo_path}
                className="object-contains w-[300px] h-[300px]"
              />
            </div>
            {company.name}
          </div>
        ))}
      </div>
      <div></div>
    </section>
  );
};

export default Overview;
