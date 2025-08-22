import { useMemo } from "react";
import type { TCoin, TSortKey, TSortOrder } from "../types/types";
import { ASC, NAME } from "../constants/constants";

export function useSortedCoins(
  coins: TCoin[],
  sortKey: TSortKey,
  sortOrder: TSortOrder
) {
  return useMemo(() => {
    const sorted = [...coins].sort((a, b) => {
      if (sortKey === NAME) {
        return sortOrder === ASC
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === ASC
          ? a.current_price - b.current_price
          : b.current_price - a.current_price;
      }
    });
    return sorted;
  }, [coins, sortKey, sortOrder]);
}
