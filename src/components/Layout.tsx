import { Outlet } from "react-router";
import { SidePanel } from "../features/SidePanel/SidePanel";
import { HamburgerButton } from "../features/SidePanel/HamburgerButton";
import Navigation from "../shared/Navigation/Navigation";
import { ActionModal } from "../shared/ActionModal";
import { useDeleteModalStore } from "../store/deleteModalStore";

export default function Layout() {
  const { isOpen, expenseId, onConfirm, close } = useDeleteModalStore();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    close();
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-200">
      <HamburgerButton />

      <div className="container mx-auto px-4 py-6 pb-24">
        <Outlet />
      </div>

      <Navigation />

      <SidePanel />

      <ActionModal
        open={isOpen}
        onConfirm={handleConfirm}
        onCancel={close}
        title="Delete Expense"
        description="Are you sure you want to delete this expense? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
