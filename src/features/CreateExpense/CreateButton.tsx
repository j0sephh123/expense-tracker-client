import { useCreateExpenseStore } from "./store/createExpenseStore";

export default function CreateButton() {
  const { selectedSubcategoryId, note, selectionMethod, amount } =
    useCreateExpenseStore();

  const isDisabled = !amount || amount.trim() === "";

  const handleCreate = () => {
    console.log({ selectedSubcategoryId, note, selectionMethod, amount });
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
