import { create } from "zustand";
import { Movie } from "../entities/Movies";

interface MovieQuery {
  movieQuery: Movie;
  heroMovie: Movie;
  selectedMovie: Movie;
  setMovieQuery: (movie: Movie) => void;
  setSelectedMovie: (movie: Movie) => void;
  setHeroMovie: (movie: Movie) => void;
}

const useMovieQuery = create<MovieQuery>((set) => ({
  movieQuery: { backdrop_path: "", id: 0, title: "", overview: "" },
  heroMovie: { backdrop_path: "", id: 0, title: "", overview: "" },
  selectedMovie: { backdrop_path: "", id: 0, title: "", overview: "" },
  setMovieQuery: (movie) => set(() => ({ movieQuery: { ...movie } })),
  setSelectedMovie: (movie) => set(() => ({ selectedMovie: { ...movie } })),
  setHeroMovie: (movie) => set(() => ({ heroMovie: { ...movie } })),
}));

export default useMovieQuery;
