import { create } from "zustand";

interface AuthQuery {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
}

const useAuthQuery = create<AuthQuery>((set) => ({
  isLogged: false,
  setIsLogged: (isLogged) => set(() => ({ isLogged: isLogged })),
}));

export default useAuthQuery;
