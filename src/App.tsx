import { SidePanel } from "./components/SidePanel";
import { HamburgerButton } from "./components/HamburgerButton";

function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-200">
      <HamburgerButton />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center">Expense Tracker</h1>
        <p className="text-center text-text-secondary mt-4">
          Click the hamburger menu to open the side panel
        </p>
      </div>

      <SidePanel />
    </div>
  );
}

export default App;
