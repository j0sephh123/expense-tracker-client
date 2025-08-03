import type { JSX } from "react";
import clsx from "clsx";

interface IconButtonProps {
  onClick: () => void;
  icon: JSX.Element;
  variant?: "primary" | "secondary" | "danger" | "success";
  title?: string;
  disabled?: boolean;
}

const IconButton = ({
  onClick,
  icon,
  variant = "secondary",
  title,
  disabled = false,
}: IconButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 p-1.5 rounded-md";

  const variantClasses = {
    primary:
      "border-blue-500 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 focus:ring-blue-500",
    secondary:
      "border-gray-600 text-gray-400 hover:text-gray-300 hover:bg-gray-600/10 focus:ring-gray-500",
    danger:
      "border-red-500 text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:ring-red-500",
    success:
      "border-green-500 text-green-400 hover:text-green-300 hover:bg-green-500/10 focus:ring-green-500",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed border-gray-500 text-gray-500"
    : "cursor-pointer active:scale-95";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseClasses, variantClasses[variant], disabledClasses)}
      title={title}
    >
      {icon}
    </button>
  );
};

export default IconButton;
