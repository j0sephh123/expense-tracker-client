import { Link, useLocation } from "react-router";
import { Home, FolderKanban, CirclePlus, BarChart3 } from "lucide-react";

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/expenses";
    }
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-base-300 border-t border-base-200 px-4 py-2">
      <div className="max-w-md mx-auto flex justify-around items-center">
        <Link
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            isActive("/")
              ? "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400"
              : "text-base-content hover:text-primary"
          }`}
          to="/"
          data-discover="true"
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            isActive("/categories")
              ? "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400"
              : "text-base-content hover:text-primary"
          }`}
          to="/categories"
          data-discover="true"
        >
          <FolderKanban className="w-6 h-6" />
          <span className="text-xs mt-1">Categories</span>
        </Link>
        <Link
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            isActive("/create-expense")
              ? "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400"
              : "text-base-content hover:text-primary"
          }`}
          to="/create-expense"
          data-discover="true"
        >
          <CirclePlus className="w-6 h-6" />
          <span className="text-xs mt-1">Add Expense</span>
        </Link>
        <Link
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            isActive("/summary")
              ? "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400"
              : "text-base-content hover:text-primary"
          }`}
          to="/summary"
          data-discover="true"
        >
          <BarChart3 className="w-6 h-6" />
          <span className="text-xs mt-1">Summary</span>
        </Link>
      </div>
    </nav>
  );
}
