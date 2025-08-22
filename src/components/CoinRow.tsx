import { useState } from "react";
import type { TCoin } from "../types/types";
import Button from "./Button";

const CoinRow: React.FC<{
  coin: TCoin;
}> = ({ coin }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <tr key={coin.id} className="text-center relative">
      <td className="border px-3 py-2">
        <img src={coin.image} alt={coin.name} className="w-6 h-6 mx-auto" />
      </td>
      <td className="border px-3 py-2">{coin.name}</td>
      <td className="border px-3 py-2">${coin.current_price}</td>
      <td className="border px-3 py-2 relative">
        <Button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="px-1 py-0.5 rounded border"
          variant="primary"
        >
          Options
        </Button>

        {openDropdown && (
          <div className="absolute flex flex-col mt-2 w-28 rounded shadow-lg z-10">
            <Button variant="secondary" className="px-1 py-0.5">
              Buy
            </Button>
            <Button className="px-1 py-0.5" variant="secondary">
              Sell
            </Button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default CoinRow;
