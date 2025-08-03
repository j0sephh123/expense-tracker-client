import type { JSX } from "react";
import clsx from "clsx";

interface IconButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
    primary: "border-blue-600 text-blue-300 focus:ring-blue-600",
    secondary: "border-gray-600 text-gray-300 focus:ring-gray-600",
    danger: "border-red-600 text-red-300 focus:ring-red-600",
    success: "border-green-600 text-green-300 focus:ring-green-600",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed border-gray-500 text-gray-500"
    : "cursor-pointer";

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
