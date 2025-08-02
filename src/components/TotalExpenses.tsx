import type { Expense } from "../types/expense";

interface TotalExpensesProps {
  expenses: Expense[];
}

export default function TotalExpenses({ expenses }: TotalExpensesProps) {
  return (
    <div className="flex items-center space-x-3 justify-end mb-1">
      <div className="text-xs text-gray-400">Total</div>
      <div className="text-xl font-bold text-green-400">
        {expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
      </div>
    </div>
  );
}
