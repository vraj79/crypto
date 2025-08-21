import { create } from "zustand";
import axios from "axios";
import type { TAllCoinsState } from "../types/types";

const API_URL = import.meta.env.VITE_API_URL;

export const useAllCoinsStore = create<TAllCoinsState>((set) => ({
  coins: [],
  loading: false,
  error: null,

  fetchAllCoins: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(API_URL, {
        params: {
          vs_currency: "usd",
        },
      });
      set({ coins: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch coins", loading: false });
    }
  },
}));
