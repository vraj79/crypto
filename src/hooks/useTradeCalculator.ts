import { useCallback, useEffect } from "react";
import type { TTradeState } from "../types/types";

const useTradeCalculator = (
  state: TTradeState,
  setState: React.Dispatch<React.SetStateAction<TTradeState>>,
  price: number
) => {
  useEffect(() => {
    const val = parseFloat(state.inputValue);
    if (Number.isNaN(val)) {
      setState((s) => ({ ...s, outputValue: "" }));
      return;
    }

    const output = state.isCryptoFirst
      ? (val * price).toFixed(2)
      : price
        ? (val / price).toString()
        : "";

    setState((s) => ({ ...s, outputValue: output }));
  }, [state.inputValue, state.isCryptoFirst, price, setState]);

  const handleSwap = useCallback(() => {
    setState((s) => {
      const val = parseFloat(s.inputValue);
      if (Number.isNaN(val)) return { ...s, isCryptoFirst: !s.isCryptoFirst };

      const swappedInput = s.isCryptoFirst
        ? (val * price).toFixed(2)
        : price
          ? (val / price).toString()
          : "";

      const swappedOutput = s.isCryptoFirst ? val.toString() : val.toFixed(2);

      return {
        ...s,
        isCryptoFirst: !s.isCryptoFirst,
        inputValue: swappedInput,
        outputValue: swappedOutput,
      };
    });
  }, [price, setState]);

  return { handleSwap };
};

export default useTradeCalculator;
