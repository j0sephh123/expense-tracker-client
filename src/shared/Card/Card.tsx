import { Edit, Trash2 } from "lucide-react";
import IconButton from "../IconButton/IconButton";

interface CardProps {
  title: string;
  subtitle?: string;
  description?: string;
  amount?: number;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
  hoverActions?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "orange";
  }[];
}

const Card = ({
  title,
  subtitle,
  description,
  amount,
  onEdit,
  onDelete,
  onClick,
  hoverActions,
}: CardProps) => {
  const hasActions = onEdit || onDelete;
  const hasHoverActions = hoverActions && hoverActions.length > 0;

  const baseClasses = "rounded-lg border transition-colors duration-200";
  const interactiveClasses =
    "flex items-center justify-between p-3 bg-gray-700 border-gray-600";
  const simpleClasses =
    "p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-pointer";

  return (
    <div
      className={`${baseClasses} relative ${
        hasActions ? interactiveClasses : simpleClasses
      }`}
      onClick={!hasActions && !hasHoverActions && onClick ? onClick : undefined}
    >
      {hasActions ? (
        <>
          <div className="flex-1">
            <div className="flex items-center">
              <div className="flex-1 min-w-0 cursor-pointer" onClick={onClick}>
                <div className="flex flex-col space-y-1">
                  <span className="font-medium text-gray-100 text-sm truncate">
                    {title}
                  </span>
                  {subtitle && (
                    <span className="text-xs text-gray-400">{subtitle}</span>
                  )}
                </div>
                {description && (
                  <p className="text-xs text-gray-300 mt-1 truncate">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center ml-2">
            {amount && (
              <span className="text-sm font-bold text-green-400">
                {amount.toFixed(2)}
              </span>
            )}
            <div className="flex space-x-1">
              {onDelete && (
                <IconButton
                  onClick={onDelete}
                  variant="danger"
                  title="Delete"
                  icon={<Trash2 className="w-3.5 h-3.5" />}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </div>
      )}

      {hasHoverActions && (
        <div className="flex items-center justify-end mt-3">
          {hoverActions.map((action, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
              className={`px-3 py-1.5 rounded-md transition-colors text-xs font-medium ${
                action.variant === "secondary"
                  ? "bg-gray-600 text-gray-200"
                  : action.variant === "orange"
                  ? "bg-amber-700 text-amber-100"
                  : "bg-slate-600 text-slate-200"
              }`}
            >
              {action.label}
            </button>
          ))}
          {onEdit && (
            <IconButton
              onClick={onEdit}
              variant="primary"
              title="Edit"
              icon={<Edit className="w-3.5 h-3.5" />}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
