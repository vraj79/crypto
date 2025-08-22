import { useMemo, useState } from "react";
import Button from "./Button";
import Select from "./Select";
import InputField from "./InputField";
import type { TradeFormProps, TTradeState } from "../types/types";
import useTradeCalculator from "../hooks/useTradeCalculator";

function TradeForm({ coins }: TradeFormProps) {
  const [tradeState, setTradeState] = useState<TTradeState>({
    selectedCoin: "bitcoin",
    isCryptoFirst: true,
    inputValue: "",
    outputValue: "",
  });

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

  return (
    <>
      <div className="mb-4">
        <div className="flex gap-2 items-center">
          <InputField
            label={
              tradeState.isCryptoFirst ? "Crypto Amount" : "Fiat Amount (USD)"
            }
            type="number"
            value={tradeState.inputValue}
            onChange={(e) => {
              const value = e.target.value;
              if (Number(value) < 0) return;
              setTradeState((s) => ({ ...s, inputValue: value }));
            }}
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
    </>
  );
}

export default TradeForm;
