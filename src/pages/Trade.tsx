import { useEffect, useMemo, useState } from "react";
import useUserStore from "../store/useUserStore";
import { useAllCoinsStore } from "../store/useAllCoinsStore";
import Button from "../components/Button";
import Select from "../components/Select";
import InputField from "../components/InputField";
import type { TTradeState } from "../types/types";
import useTradeCalculator from "../hooks/useTradeCalculator";

function Trade() {
  const { user } = useUserStore();
  const { coins, fetchAllCoins, loading } = useAllCoinsStore();

  const [tradeState, setTradeState] = useState<TTradeState>({
    selectedCoin: "bitcoin",
    isCryptoFirst: true,
    inputValue: "",
    outputValue: "",
  });

  useEffect(() => {
    if (coins.length === 0) fetchAllCoins();
  }, [coins, fetchAllCoins]);

  const selectedCoinPrice =
    coins.find((c) => c.id === tradeState.selectedCoin)?.current_price || 0;

  const { handleSwap } = useTradeCalculator(
    tradeState,
    setTradeState,
    selectedCoinPrice
  );

  const options = useMemo(
    () =>
      coins.map((c) => ({
        label: `${c.symbol.toUpperCase()} · ${c.name}`,
        value: c.id,
      })),
    [coins]
  );

  if (!user) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">Please login to access Trade Page</h2>
      </div>
    );
  }

  if (loading && coins.length === 0) {
    return <div className="p-6 text-center">Loading coins...</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto border rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Trade</h2>
        <div className="text-xs opacity-70">Live price · USD</div>
      </div>

      <div className="mb-4">
        <div className="flex gap-2 items-center">
          <InputField
            label={
              tradeState.isCryptoFirst ? "Crypto Amount" : "Fiat Amount (USD)"
            }
            type="number"
            value={tradeState.inputValue}
            onChange={(e) =>
              setTradeState((s) => ({ ...s, inputValue: e.target.value }))
            }
            placeholder={tradeState.isCryptoFirst ? "0.0" : "0.00"}
            width="w-1/2"
          />
          {tradeState.isCryptoFirst ? (
            <Select
              value={tradeState.selectedCoin}
              onChange={(v) =>
                setTradeState((s) => ({ ...s, selectedCoin: v }))
              }
              options={options}
              className="w-1/2 mt-2"
            />
          ) : (
            <div className="text-right text-neutral-500 px-2 py-2">USD</div>
          )}
        </div>
        <div className="mt-2 text-xs text-neutral-500">
          {selectedCoinPrice
            ? `${options.find((o) => o.value === tradeState.selectedCoin)?.label} ≈ $${selectedCoinPrice.toLocaleString()}`
            : "Select a crypto"}
        </div>
      </div>

      <div className="flex justify-center my-4">
        <Button onClick={handleSwap}>⇅ Swap</Button>
      </div>

      <div className="mt-3">
        <div className="flex gap-2 items-center">
          <InputField
            label={
              tradeState.isCryptoFirst ? "Fiat Amount (USD)" : "Crypto Amount"
            }
            type="text"
            value={tradeState.outputValue}
            onChange={() => {}}
            placeholder="0"
            width="w-full"
          />
          {!tradeState.isCryptoFirst ? (
            <Select
              value={tradeState.selectedCoin}
              onChange={(v) =>
                setTradeState((s) => ({ ...s, selectedCoin: v }))
              }
              options={options}
              className="w-52 mt-2"
            />
          ) : (
            <div className="text-right text-neutral-500 px-2 py-2">USD</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Trade;
