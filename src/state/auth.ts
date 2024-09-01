import { create } from 'zustand';
import { persist } from 'zustand/middleware';
type UserStore = {
  token: AuthToken | null;
  setToken: (token: AuthToken) => void;
  clear: () => void;
};

const useAuthStore = create<UserStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clear: () => set({ token: null }),
    }),
    {
      name: 'auth-token',
    },
  ),
);

export default useAuthStore;
