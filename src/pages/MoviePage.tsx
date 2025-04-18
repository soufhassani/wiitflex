import { useLocation, useParams } from "react-router-dom";
import useMovie from "../hooks/useMovie";
import useMovieQuery from "../store/movieStore";
import Hero from "../components/movie/moviePage/Hero";
import Overview from "../components/movie/moviePage/Overview";
import Clips from "../components/movie/moviePage/Clips";
import MoviePageSkeleton from "../components/skeletons/MoviePage/MoviePageSkeleton";
import ProtectedRoutes from "../components/global/ProtectedRoutes";
import { useEffect } from "react";

const MoviePage = () => {
  const { type, id } = useParams();
  const location = useLocation();
  const selectedMovie = location.state || null;

  const setMovie = useMovieQuery((s) => s.setSelectedMovie);
  const theID = Number(id);

  const { data, isPending, error } = useMovie({ id: theID, mediaType: type });

  useEffect(() => {
    if (data) setMovie({ ...data, media_type: type });
  }, [data]);

  if (error) {
    console.log("error: ", error);
    throw error;
  }

  if (isPending)
    return selectedMovie && <MoviePageSkeleton movie={selectedMovie} />;

  return (
    <ProtectedRoutes>
      <section className="text-sky-50">
        <Hero />
        <Overview />
        <Clips />
      </section>
    </ProtectedRoutes>
  );
};

export default MoviePage;
