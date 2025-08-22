import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { TUserState } from "../types/types";
import { decrypt, encrypt } from "../utils/crypto";

const useUserStore = create<TUserState>()(
  persist(
    (set, get) => ({
      user: null,
      login: (email: string) => set({ user: { email: encrypt(email) } }),
      logout: () => {
        set({ user: null });
        localStorage.removeItem("user-store");
      },
      getEmail: () => {
        const user = get().user;
        return user?.email ? decrypt(user.email) : null; // 🔓 decrypt on read
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
