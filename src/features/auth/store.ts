import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { User } from "./types";

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        login: (user) => set({ user }),
        logout: () => set({ user: null }),
      }),
      {
        name: "auth-storage", // localStorage key
      }
    ),
    {
      name: "AuthStore", // devtools'da ko‘rinadigan nom
    }
  )
);
