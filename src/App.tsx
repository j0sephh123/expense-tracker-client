import DailyExpenses from "./components/DailyExpenses";

function App() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4">Expense Tracker</h1>

      <div className="max-w-4xl mx-auto">
        <DailyExpenses />
      </div>
    </>
  );
}

export default App;
