import { create } from "zustand";



interface ModalQuery {
  modalActive: boolean;
  setModalActive: () => void;
}

const useModalActive = create<ModalQuery>((set) => ({
  modalActive: false,
  setModalActive: () => set((s) => ({ modalActive: !s.modalActive })),
}));

export default useModalActive
