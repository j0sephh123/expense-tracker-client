import { Outlet } from "react-router";
import { SidePanel } from "../features/SidePanel/SidePanel";
import { HamburgerButton } from "../features/SidePanel/HamburgerButton";
import Navigation from "../shared/Navigation/Navigation";

export default function Layout() {
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
