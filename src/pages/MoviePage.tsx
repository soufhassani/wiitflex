import { useParams } from "react-router-dom";
import useMovie from "../hooks/useMovie";
import Spinner from "../components/global/Spinner";
import useMovieQuery from "../store/movieStore";
import Hero from "../components/movie/moviePage/Hero";
import Overview from "../components/movie/moviePage/Overview";
import Clips from "../components/movie/moviePage/Clips";

const MoviePage = () => {
  const { type, id } = useParams();
  const setMovie = useMovieQuery((s) => s.setSelectedMovie);
  const theID = Number(id);

  const { data, isLoading, error } = useMovie({ id: theID, mediaType: type });

  if (error) throw error;

  if (isLoading) return <Spinner text="Loading..." />;

  if (data) setMovie({ ...data, media_type: type });

  return (
    <div className="text-sky-50">
      <Hero />
      <Overview />
      <Clips />
    </div>
  );
};

export default MoviePage;
