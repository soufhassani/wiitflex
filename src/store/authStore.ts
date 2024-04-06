import { create } from "zustand";

interface AuthQuery {
    isLoggedin: boolean
    setIsLoggedin: (isLogged: boolean) => void
  }
  
const useAuthQuery = create<AuthQuery>((set) => ({
    isLoggedin: false,
    setIsLoggedin: (isLogged) => set(() => ({ isLoggedin: isLogged })),
}));

export default useAuthQuery