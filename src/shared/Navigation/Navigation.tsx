import { Link, useLocation } from "react-router";
import { Home, FolderKanban, CirclePlus, Plus } from "lucide-react";

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/expenses";
    }
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-2">
      <div className="max-w-md mx-auto flex justify-around items-center">
        <Link
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            isActive("/")
              ? "text-blue-400 bg-blue-900 dark:bg-blue-800 dark:text-blue-300"
              : "text-base-content"
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
              ? "text-blue-400 bg-blue-900 dark:bg-blue-800 dark:text-blue-300"
              : "text-base-content"
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
              ? "text-blue-400 bg-blue-900 dark:bg-blue-800 dark:text-blue-300"
              : "text-base-content"
          }`}
          to="/create-expense"
          data-discover="true"
        >
          <CirclePlus className="w-6 h-6" />
          <span className="text-xs mt-1">Add Expense</span>
        </Link>
        <Link
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            isActive("/create-category")
              ? "text-blue-400 bg-blue-900 dark:bg-blue-800 dark:text-blue-300"
              : "text-base-content"
          }`}
          to="/create-category"
          data-discover="true"
        >
          <Plus className="w-6 h-6" />
          <span className="text-xs mt-1">Add Category</span>
        </Link>
      </div>
    </nav>
  );
}
