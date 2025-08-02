import { useSidePanelStore } from "./sidePanelStore";

export const SidePanel = () => {
  const { isOpen, close } = useSidePanelStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-0 w-80 bg-bg-secondary border-r border-border shadow-lg z-50">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-text-primary">Side Panel</h2>
        <button
          onClick={close}
          className="text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <p className="text-text-primary">Hello! This is the side panel.</p>
      </div>
    </div>
  );
};
