import useMovieQuery from "../../../store/movieStore";

const Overview = () => {
  const selectedMovie = useMovieQuery((s) => s.selectedMovie);
  return (
    <section className="py-20 px-10 max-w-[920px] text-center mx-auto">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h3 className="font-main text-4xl font-semibold ">Overview</h3>
          <p className="text-slate-50 text-xl">{selectedMovie.overview}</p>
        </div>
        <div className="flex justify-between text-left gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-main text-xl font-semibold text-slate-50">
              Genres
            </h3>
            <p>
              {selectedMovie.genres?.map((genre, i) => (
                <span key={genre.id}>
                  {genre.name}
                  {selectedMovie.genres?.length !== i + 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-main text-xl font-semibold text-slate-50">
              Production Companies
            </h3>
            <ul>
              {selectedMovie.production_companies?.map((company) => (
                <li key={company.id}>{company.name}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-main text-xl font-semibold text-slate-50">
              Production Countries
            </h3>
            <ul>
              {selectedMovie.production_countries?.map((country, index) => (
                <li key={index}>{country.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
