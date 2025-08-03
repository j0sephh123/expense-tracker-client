import { Edit, Trash2 } from "lucide-react";
import IconButton from "../IconButton";

interface CardProps {
  title: string;
  subtitle?: string;
  description?: string;
  amount?: number;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
  variant?: "interactive" | "simple";
}

const Card = ({
  title,
  subtitle,
  description,
  amount,
  onEdit,
  onDelete,
  onClick,
  variant = "interactive",
}: CardProps) => {
  const hasActions = onEdit || onDelete;
  const isInteractive = variant === "interactive" && hasActions;
  const isSimple = variant === "simple" || (!hasActions && onClick);

  const baseClasses = "rounded-lg border transition-colors duration-200";
  const interactiveClasses =
    "flex items-center justify-between p-3 bg-gray-700 border-gray-600 hover:bg-gray-650";
  const simpleClasses =
    "p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700";

  return (
    <div
      className={`${baseClasses} ${
        isInteractive ? interactiveClasses : simpleClasses
      }`}
      onClick={isSimple ? onClick : undefined}
    >
      {isInteractive ? (
        <>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <div className="flex-1 min-w-0">
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
          <div className="flex items-center space-x-2 ml-2">
            {amount && (
              <span className="text-sm font-bold text-green-400">
                {amount.toFixed(2)}
              </span>
            )}
            <div className="flex space-x-1">
              {onEdit && (
                <IconButton
                  onClick={onEdit}
                  variant="primary"
                  title="Edit"
                  icon={<Edit className="w-3.5 h-3.5" />}
                />
              )}
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
    </div>
  );
};

export default Card;
