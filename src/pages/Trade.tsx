import { useState, useEffect } from "react";
import axios from "axios";
import useUserStore from "../store/userStore";
import Button from "../components/Button";
import type { Coin } from "../types/coin";

const API_URL = import.meta.env.VITE_API_URL;

function Trade() {
  const { user } = useUserStore();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");

  const [isCryptoFirst, setIsCryptoFirst] = useState(true);
  const [inputValue, setInputValue] = useState<number>(0);
  const [outputValue, setOutputValue] = useState<number>(0);

  useEffect(() => {
    axios
      .get(API_URL, {
        params: { vs_currency: "usd" },
      })
      .then((res) => setCoins(res.data))
      .catch(() => alert("Error loading coins"));
  }, []);

  const selectedCoinPrice =
    coins.find((c) => c.id === selectedCoin)?.current_price || 0;

  useEffect(() => {
    if (isCryptoFirst) {
      setOutputValue(inputValue * selectedCoinPrice);
    } else {
      setOutputValue(inputValue / selectedCoinPrice);
    }
  }, [inputValue, selectedCoin, isCryptoFirst, selectedCoinPrice]);

  if (!user) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">Please login to access Trade Page</h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Trade</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          {isCryptoFirst ? "Crypto Amount" : "Fiat Amount (USD)"}
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-500"
            value={inputValue}
            onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
          />
          {isCryptoFirst && (
            <select
              value={selectedCoin}
              onChange={(e) => setSelectedCoin(e.target.value)}
              className="border px-2 py-2 rounded"
            >
              {coins.slice(0, 20).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <Button onClick={() => setIsCryptoFirst(!isCryptoFirst)}>⇅ Swap</Button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          {isCryptoFirst ? "Fiat Amount (USD)" : "Crypto Amount"}
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            className="border px-3 py-2 rounded w-full bg-gray-100"
            value={outputValue}
            readOnly
          />
          {!isCryptoFirst && (
            <select
              value={selectedCoin}
              onChange={(e) => setSelectedCoin(e.target.value)}
              className="border px-2 py-2 rounded"
            >
              {coins.slice(0, 20).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}

export default Trade;
