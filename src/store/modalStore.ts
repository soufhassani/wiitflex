import { create } from "zustand";



interface ModalQuery {
  modalActive: boolean;
  showMovieDetails: boolean;
  setModalActive: () => void;
  setShowMovieDetails: (showDetails:boolean) => void 
}

const useModalActive = create<ModalQuery>((set) => ({
  modalActive: false,
  showMovieDetails: false,
  setModalActive: () => set((s) => ({ modalActive: !s.modalActive })),
  setShowMovieDetails: (showDetails) => set((s) => ({...s, showMovieDetails: showDetails}))
}));

export default useModalActive
