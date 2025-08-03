import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ArrowButtonProps {
  onClick: () => void;
  direction: "left" | "right";
  disabled?: boolean;
  className?: string;
}

const ArrowButton = ({
  onClick,
  direction,
  disabled = false,
  className,
}: ArrowButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "p-1.5 rounded transition-all duration-200 bg-gray-700",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
        disabled
          ? "text-gray-500 cursor-not-allowed opacity-50"
          : "text-gray-400 hover:text-blue-400 hover:bg-gray-600 active:scale-95",
        className
      )}
      title={direction === "left" ? "Previous day" : "Next day"}
    >
      {direction === "left" ? (
        <ChevronLeft className="w-6 h-6" />
      ) : (
        <ChevronRight className="w-6 h-6" />
      )}
    </button>
  );
};

export default ArrowButton;
