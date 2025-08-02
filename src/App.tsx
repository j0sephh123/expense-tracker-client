import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidePanel } from "./components/SidePanel";
import { HamburgerButton } from "./components/HamburgerButton";
import DailyExpenses from "./components/DailyExpenses";

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

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            Expense Tracker
          </h1>

          <div className="max-w-4xl mx-auto">
            <DailyExpenses />
          </div>
        </div>

        <SidePanel />
      </div>
    </QueryClientProvider>
  );
}

export default App;
