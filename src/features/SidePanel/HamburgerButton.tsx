import { useSidePanelStore } from "./sidePanelStore";
import { Menu } from "lucide-react";
import IconButton from "../../shared/IconButton/IconButton";

export const HamburgerButton = () => {
  const { open } = useSidePanelStore();

  return (
    <div className="fixed top-4 left-4 z-40">
      <IconButton
        onClick={open}
        variant="secondary"
        title="Open menu"
        icon={<Menu className="w-6 h-6" />}
      />
    </div>
  );
};
