import { useEffect } from "react";
import { useAllCoinsStore } from "../store/useAllCoinsStore";
import TradeForm from "../components/TradeForm";

function Trade() {
  const { coins, fetchAllCoins, loading } = useAllCoinsStore();

  useEffect(() => {
    if (coins.length === 0) fetchAllCoins();
  }, [coins, fetchAllCoins]);

  if (loading && coins.length === 0) {
    return <div className="p-6 text-center">Loading coins...</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto border rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Trade</h2>
        <div className="text-xs opacity-70">Live price · USD</div>
      </div>
      <TradeForm coins={coins} />
    </div>
  );
}

export default Trade;
