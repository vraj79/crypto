import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button";
import type { Coin } from "../types/coin";

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [sortKey, setSortKey] = useState<"name" | "price">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(API_URL, {
        params: { vs_currency: "usd" },
      })
      .then((res) => setCoins(res.data))
      .catch(() => alert("Error loading coins"));
  }, []);

  const handleSort = (key: "name" | "price") => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedCoins = [...coins].sort((a, b) => {
    if (sortKey === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortOrder === "asc"
        ? a.current_price - b.current_price
        : b.current_price - a.current_price;
    }
  });

  const renderSortSymbol = (key: "name" | "price") => {
    if (sortKey !== key) return "↕";
    return sortOrder === "asc" ? "▲" : "▼";
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Crypto Assets</h1>

      <table className="border w-full mb-6">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border px-3 py-2 text-center">Icon</th>
            <th
              className="border px-3 py-2 cursor-pointer select-none text-center"
              onClick={() => handleSort("name")}
            >
              Name {renderSortSymbol("name")}
            </th>
            <th
              className="border px-3 py-2 cursor-pointer select-none text-center"
              onClick={() => handleSort("price")}
            >
              Price (USD) {renderSortSymbol("price")}
            </th>
            <th className="border px-3 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedCoins.slice(0, visibleCount).map((c) => (
            <tr key={c.id} className="text-center relative">
              <td className="border px-3 py-2">
                <img src={c.image} alt={c.name} className="w-6 h-6 mx-auto" />
              </td>
              <td className="border px-3 py-2">{c.name}</td>
              <td className="border px-3 py-2">${c.current_price}</td>
              <td className="border px-3 py-2 relative">
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === c.id ? null : c.id)
                  }
                  className="px-3 py-1 bg-gray-100 rounded border"
                >
                  Options
                </button>

                {openDropdown === c.id && (
                  <div
                    className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-10"
                    tabIndex={0}
                    ref={(el) => {
                      if (el) {
                        const handleClick = (e: MouseEvent) => {
                          if (!el.contains(e.target as Node)) {
                            setOpenDropdown(null);
                          }
                        };
                        document.addEventListener("mousedown", handleClick);
                        return () => {
                          document.removeEventListener(
                            "mousedown",
                            handleClick
                          );
                        };
                      }
                    }}
                  >
                    <button className="block px-4 py-2 w-full hover:bg-gray-200">
                      Buy
                    </button>
                    <button className="block px-4 py-2 w-full hover:bg-gray-200">
                      Sell
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {visibleCount < coins.length && (
        <div className="text-center">
          <Button onClick={() => setVisibleCount(visibleCount + 10)}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

export default Home;
