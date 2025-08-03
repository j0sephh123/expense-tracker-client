import { Outlet } from "react-router";
import { SidePanel } from "../features/SidePanel/SidePanel";
import { HamburgerButton } from "../features/SidePanel/HamburgerButton";
import Navigation from "../shared/Navigation/Navigation";
import { useCreateExpenseStore } from "../features/CreateExpense/store/createExpenseStore";
import { useEffect } from "react";

export default function Layout() {
  const { selectedSubcategoryId, note, selectionMethod, amount } =
    useCreateExpenseStore();

  useEffect(() => {
    console.log({ selectedSubcategoryId, note, selectionMethod, amount });
  }, [selectedSubcategoryId, note, selectionMethod, amount]);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-200">
      <HamburgerButton />

      <div className="container mx-auto px-4 py-6">
        <Outlet />
      </div>

      <Navigation />

      <SidePanel />
    </div>
  );
}
