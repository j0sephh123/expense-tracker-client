export default function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-base-300 border-t border-base-200 px-4 py-2">
      <div className="max-w-md mx-auto flex justify-around items-center">
        <a
          className="flex flex-col items-center p-2 rounded-lg transition-colors text-primary"
          href="/categories"
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
        </a>
        <a
          className="flex flex-col items-center p-2 rounded-lg transition-colors text-base-content hover:text-primary"
          href="/"
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
        </a>
        <a
          className="flex flex-col items-center p-2 rounded-lg transition-colors text-base-content hover:text-primary"
          href="/summary"
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
        </a>
      </div>
    </nav>
  );
}
