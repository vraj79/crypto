import type { TInputFieldProps } from "../types/types";

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className,
  readOnly = false,
  width,
}: TInputFieldProps) => {
  return (
    <div className={`${width} mb-4`}>
      <label className="block text-sm font-medium mb-1 text-gray-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border border-gray-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white ${className}`}
        readOnly={readOnly}
      />
    </div>
  );
};

export default InputField;
