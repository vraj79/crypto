import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useCoinStore } from "../store/useCoinStore";
import type { TSortKey, TSortOrder } from "../types/types";
import { ASC, DESC, NAME } from "../constants/constants";
import { useSortedCoins } from "../hooks/useSortedCoins";
import CoinTable from "../components/CoinTable";

function Home() {
  const { coins, fetchCoins, hasMore, loading } = useCoinStore();
  const [sortKey, setSortKey] = useState<TSortKey>(NAME);
  const [sortOrder, setSortOrder] = useState<TSortOrder>(ASC);

  useEffect(() => {
    if (coins.length === 0) {
      fetchCoins();
    }
  }, [coins, fetchCoins]);

  const sortedCoins = useSortedCoins(coins, sortKey, sortOrder);

  const handleSort = (key: TSortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === ASC ? DESC : ASC);
    } else {
      setSortKey(key);
      setSortOrder(ASC);
    }
  };

  return (
    <div className="p-0 md:p-4 max-w-5xl mx-auto">
      <h1 className="text-lg md:text-3xl font-bold mb-4">Crypto Assets</h1>
      <CoinTable
        coins={sortedCoins}
        sortKey={sortKey}
        sortOrder={sortOrder}
        onSort={handleSort}
      />
      {hasMore && (
        <div className="text-center">
          {loading ? (
            <span>Loading...</span>
          ) : (
            <Button onClick={fetchCoins}>
              {loading ? "Loading..." : "Load More"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
