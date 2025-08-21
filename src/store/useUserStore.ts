import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { TUserState } from "../types/types";

function encode(str: string) {
  return btoa(str);
}

function decode(str: string) {
  return atob(str);
}

const useUserStore = create<TUserState>()(
  persist(
    (set, get) => ({
      user: null,
      login: (email: string) => set({ user: { email: encode(email) } }), // store encoded
      logout: () => {
        set({ user: null });
        localStorage.removeItem("user-store");
      },
      getEmail: () => {
        const user = get().user;
        return user && user.email ? decode(user.email) : null;
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
