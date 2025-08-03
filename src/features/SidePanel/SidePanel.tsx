import { useSidePanelStore } from "./sidePanelStore";
import { X, LogOut } from "lucide-react";
import IconButton from "../../shared/IconButton/IconButton";
import { auth } from "../../utils/api";
import { useNavigate } from "react-router";

export const SidePanel = () => {
  const { isOpen, close } = useSidePanelStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    close();
    navigate("/login");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-0 w-80 bg-bg-secondary border-r border-border shadow-lg z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-text-primary">Side Panel</h2>
        <IconButton
          onClick={close}
          variant="secondary"
          title="Close panel"
          icon={<X className="w-6 h-6" />}
        />
      </div>

      <div className="flex-1 p-4">
        <p className="text-text-primary">Hello! This is the side panel.</p>
      </div>

      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-text-primary hover:text-red-400 transition-colors duration-200 rounded-md hover:bg-bg-primary"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
