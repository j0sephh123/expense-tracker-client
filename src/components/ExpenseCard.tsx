import { Trash2 } from "lucide-react";
import IconButton from "../shared/IconButton/IconButton";

interface ExpenseCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  amount?: number;
  onDelete?: () => void;
  onClick?: () => void;
}

const ExpenseCard = ({
  title,
  subtitle,
  description,
  amount,
  onDelete,
  onClick,
}: ExpenseCardProps) => {
  const baseClasses = "rounded-lg border transition-colors duration-200";
  const interactiveClasses =
    "flex items-center justify-between p-3 bg-gray-700 border-gray-600";

  return (
    <div className={`${baseClasses} relative ${interactiveClasses}`}>
      <div className="flex items-center">
        <div className="flex-1 min-w-0 cursor-pointer" onClick={onClick}>
          <div className="flex flex-col space-y-1">
            <span className="font-medium text-gray-100 text-md truncate">
              {title}
            </span>
            {subtitle && (
              <span className="text-xs text-gray-400">{subtitle}</span>
            )}
          </div>
          {description && (
            <p className="text-xs text-gray-300 mt-1 truncate">{description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center ml-2">
        {amount && (
          <span className="text-sm font-bold text-green-400 pr-2">
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
    </div>
  );
};

export default ExpenseCard;
