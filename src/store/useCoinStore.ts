import { create } from "zustand";
import axios from "axios";
import type { TCoin, TCoinState } from "../types/types";

const API_URL = import.meta.env.VITE_API_URL;

export const useCoinStore = create<TCoinState>((set, get) => ({
  coins: [],
  page: 1,
  perPage: 10,
  loading: false,
  hasMore: true,

  fetchCoins: async () => {
    const { page, perPage, coins } = get();
    if (get().loading) return;

    set({ loading: true });
    try {
      const res = await axios.get(API_URL, {
        params: { vs_currency: "usd", per_page: perPage, page },
      });

      const newCoins: TCoin[] = res.data;

      set({
        coins: [...coins, ...newCoins],
        page: page + 1,
        hasMore: newCoins.length > 0,
        loading: false,
      });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },
}));
