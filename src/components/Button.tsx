import type { TButtonProps, TButtonVariant } from "../types/types";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}: TButtonProps & { variant?: TButtonVariant; className?: string }) => {
  const baseClasses =
    "px-4 py-2 rounded-lg font-medium transition focus:outline-none";
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-neutral-900",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    ghost: "bg-transparent hover:text-sky-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
