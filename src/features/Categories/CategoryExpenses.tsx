import { useParams } from "react-router";
import { useExpenses } from "../../api/expenses";
import PageWrapper from "../../shared/PageWrapper";
import TotalExpenses from "../../components/TotalExpenses";
import Card from "../../shared/Card/Card";
import Loading from "../../shared/Loading";
import ErrorComponent from "../../shared/ErrorComponent";
import NoExpenses from "../../shared/NoExpenses";

export default function CategoryExpenses() {
  const { id } = useParams();

  const {
    data: expenses = [],
    isLoading,
    isError,
  } = useExpenses({
    category_id: parseInt(id || "0"),
    order_by: "date",
    order_dir: "desc",
  });

  const handleEdit = (expenseId: number) => {
    console.log("Edit expense:", expenseId);
  };

  const handleDelete = (expenseId: number) => {
    console.log("Delete expense:", expenseId);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorComponent />;
  }

  return (
    <PageWrapper title="Category Expenses">
      <div className="bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-700">
        {expenses.length > 0 && <TotalExpenses expenses={expenses} />}

        {expenses.length === 0 ? (
          <NoExpenses />
        ) : (
          <div className="space-y-2">
            {expenses.map((expense) => (
              <Card
                key={expense.id}
                title={expense.subcategory_name || "Unknown"}
                subtitle={expense.category_name || "Unknown Category"}
                description={expense.note || undefined}
                amount={expense.amount}
                onEdit={() => handleEdit(expense.id)}
                onDelete={() => handleDelete(expense.id)}
              />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
