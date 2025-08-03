import { Outlet } from "react-router";
import { SidePanel } from "../features/SidePanel/SidePanel";
import { HamburgerButton } from "../features/SidePanel/HamburgerButton";
import Navigation from "../shared/Navigation/Navigation";
import { ActionModal } from "../shared/ActionModal";
import { useDeleteModalStore } from "../store/deleteModalStore";
import { RenameModal } from "../shared/ActionModal/RenameModal";

export default function Layout() {
  const { isOpen, itemType, itemName, onConfirm, close } =
    useDeleteModalStore();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    close();
  };

  const getModalTitle = () => {
    switch (itemType) {
      case "expense":
        return "Delete Expense";
      case "category":
        return "Delete Category";
      case "subcategory":
        return "Delete Subcategory";
      default:
        return "Delete Item";
    }
  };

  const getModalDescription = () => {
    switch (itemType) {
      case "expense":
        return "Are you sure you want to delete this expense? This action cannot be undone.";
      case "category":
        return `Are you sure you want to delete '${itemName}'? This action cannot be undone.`;
      case "subcategory":
        return `Are you sure you want to delete '${itemName}'? This action cannot be undone.`;
      default:
        return "Are you sure you want to delete this item? This action cannot be undone.";
    }
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
        title={getModalTitle()}
        description={getModalDescription()}
        confirmText="Delete"
        cancelText="Cancel"
      />

      <RenameModal />
    </div>
  );
}
