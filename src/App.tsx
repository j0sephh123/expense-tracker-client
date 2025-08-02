import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidePanel } from "./features/SidePanel/SidePanel";
import { HamburgerButton } from "./features/SidePanel/HamburgerButton";
import DailyExpensesWrapper from "./components/DailyExpensesWrapper";
import Navigation from "./components/Navigation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-200">
        <HamburgerButton />

        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-center mb-4">
            Expense Tracker
          </h1>

          <div className="max-w-4xl mx-auto">
            <DailyExpensesWrapper />
          </div>
        </div>

        <Navigation />

        <SidePanel />
      </div>
    </QueryClientProvider>
  );
}

export default App;
