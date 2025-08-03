import { FileText } from "lucide-react";

export default function NoExpenses() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mb-4">
        <FileText className="w-6 h-6 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-200 mb-2">
        No expenses recorded
      </h3>
    </div>
  );
}
