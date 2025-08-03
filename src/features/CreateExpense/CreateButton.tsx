import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useCreateExpenseStore } from "./store/createExpenseStore";
import { isValidNumber } from "../../utils/validation";
import { useCreateExpense } from "../../api/expenses";

export default function CreateButton() {
  const navigate = useNavigate();
  const { selectedSubcategoryId, note, amount, reset } =
    useCreateExpenseStore();
  const { mutateAsync: createExpense } = useCreateExpense();

  const isDisabled = useMemo(
    () => !isValidNumber(amount) || !selectedSubcategoryId,
    [amount, selectedSubcategoryId]
  );

  const handleCreate = () => {
    if (isDisabled || !selectedSubcategoryId) return;

    createExpense({
      amount: parseFloat(amount),
      subcategory_id: selectedSubcategoryId,
      note,
    }).then(() => {
      reset();
      navigate("/");
    });
  };

  return (
    <button
      onClick={handleCreate}
      disabled={isDisabled}
      className={`w-full px-4 py-2 text-white font-medium rounded-md transition-colors duration-200 ${
        isDisabled
          ? "bg-gray-400 opacity-60"
          : "bg-orange-500 hover:bg-orange-600"
      }`}
    >
      Create
    </button>
  );
}
