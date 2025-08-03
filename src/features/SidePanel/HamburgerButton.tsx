import { useSidePanelStore } from "./sidePanelStore";
import { Menu } from "lucide-react";

export const HamburgerButton = () => {
  const { open } = useSidePanelStore();

  return (
    <button
      onClick={open}
      className="fixed top-4 left-4 z-40 p-2 bg-bg-secondary border border-border rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
    >
      <Menu className="w-6 h-6 text-text-primary" />
    </button>
  );
};
