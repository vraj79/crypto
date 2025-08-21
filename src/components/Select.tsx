import React from "react";
import type { TSelectProps } from "../types/types";

const Select: React.FC<TSelectProps> = ({
  value,
  onChange,
  options,
  className,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`border px-2 py-2 rounded ${className || ""}`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
