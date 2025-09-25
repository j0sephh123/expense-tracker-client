import PageWrapper from "./shared/PageWrapper";
import DailyExpenses from "./components/DailyExpenses";


function App() {
  return (
    <PageWrapper title="Expense Tracker 123">
      <DailyExpenses />
    </PageWrapper>
  );
}

export default App;
