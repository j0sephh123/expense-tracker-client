import PageWrapper from "./shared/PageWrapper";
import DailyExpenses from "./components/DailyExpenses";


function App() {
  return (
    <PageWrapper title="Expense Tracker">
      <DailyExpenses />
    </PageWrapper>
  );
}

export default App;
