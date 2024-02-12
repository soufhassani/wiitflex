import { create } from "zustand";
import { Movie } from "../entities/Movies";

interface MovieQuery {
  movieQuery: Movie;
  setMovieQuery: (movie: Movie) => void;
}

export const useMovieQuery = create<MovieQuery>((set) => ({
  movieQuery: { backdrop_path: "", id: 0, title: "", overview: "" },
  setMovieQuery: (movie) => set(() => ({ movieQuery: { ...movie } })),
}));

interface ModalQuery {
  modalActive: boolean;
  setModalActive: () => void;
}

export const useModalActive = create<ModalQuery>((set) => ({
  modalActive: false,
  setModalActive: () => set((s) => ({ modalActive: !s.modalActive })),
}));
