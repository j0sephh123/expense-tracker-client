import { useSidePanelStore } from "./sidePanelStore";
import { X } from "lucide-react";
import IconButton from "../../shared/IconButton";

export const SidePanel = () => {
  const { isOpen, close } = useSidePanelStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-0 w-80 bg-bg-secondary border-r border-border shadow-lg z-50">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-text-primary">Side Panel</h2>
        <IconButton
          onClick={close}
          variant="secondary"
          title="Close panel"
          icon={<X className="w-6 h-6" />}
        />
      </div>
      <div className="p-4">
        <p className="text-text-primary">Hello! This is the side panel.</p>
      </div>
    </div>
  );
};
