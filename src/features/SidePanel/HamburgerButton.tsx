import { useSidePanelStore } from "./sidePanelStore";

export const HamburgerButton = () => {
  const { open } = useSidePanelStore();

  return (
    <button
      onClick={open}
      className="fixed top-4 left-4 z-40 p-2 bg-bg-secondary border border-border rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
    >
      <svg
        className="w-6 h-6 text-text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
};
