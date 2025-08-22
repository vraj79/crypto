import type { TCointTableProps, TSortKey } from "../types/types";
import { ASC } from "../constants/constants";
import CoinRow from "./CoinRow";

const CoinTable: React.FC<TCointTableProps> = ({
  coins,
  sortKey,
  sortOrder,
  onSort,
}) => {
  const renderSortSymbol = (key: TSortKey) => {
    if (sortKey !== key) return "↕";
    return sortOrder === ASC ? "▲" : "▼";
  };

  return (
    <table className="border w-full mb-6">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="border px-1 py-0.5 md:px-3 md:py-2 text-center">
            Icon
          </th>
          <th
            className="border px-1 py-0.5 md:px-3 md:py-2 cursor-pointer select-none text-center"
            onClick={() => onSort("name")}
          >
            Name {renderSortSymbol("name")}
          </th>
          <th
            className="border px-1 py-0.5 md:px-3 md:py-2 cursor-pointer select-none text-center"
            onClick={() => onSort("price")}
          >
            Price (USD) {renderSortSymbol("price")}
          </th>
          <th className="border px-1 py-0.5 md:px-3 md:py-2 text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {coins.map((c) => (
          <CoinRow key={c.id} coin={c} />
        ))}
      </tbody>
    </table>
  );
};

export default CoinTable;
