import clsx from "clsx";

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
        "p-1.5 rounded transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
        disabled
          ? "text-gray-500 cursor-not-allowed opacity-50"
          : "text-gray-400 hover:text-blue-400 hover:bg-gray-700 active:scale-95",
        className
      )}
      title={direction === "left" ? "Previous day" : "Next day"}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {direction === "left" ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        )}
      </svg>
    </button>
  );
};

export default ArrowButton;
