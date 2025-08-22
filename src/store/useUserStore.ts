import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import CryptoJS from "crypto-js";
import type { TUserState } from "../types/types";

const SECRET_KEY = "my-secret-key";

function encrypt(data: string) {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

function decrypt(cipher: string) {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return null;
  }
}

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
