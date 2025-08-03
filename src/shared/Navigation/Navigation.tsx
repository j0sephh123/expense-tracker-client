import { Link, useLocation } from "react-router";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-home w-6 h-6"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9,22 9,12 15,12 15,22"></polyline>
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-folder-kanban w-6 h-6"
          >
            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
            <path d="M8 10v4"></path>
            <path d="M12 10v2"></path>
            <path d="M16 10v6"></path>
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-circle-plus w-6 h-6"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 12h8"></path>
            <path d="M12 8v8"></path>
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-chart-bar w-6 h-6"
          >
            <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
            <path d="M7 16h8"></path>
            <path d="M7 11h12"></path>
            <path d="M7 6h3"></path>
          </svg>
          <span className="text-xs mt-1">Summary</span>
        </Link>
      </div>
    </nav>
  );
}
