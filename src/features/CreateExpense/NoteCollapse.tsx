import { useState } from "react";
import { useCreateExpenseStore } from "./store/createExpenseStore";

export default function NoteCollapse() {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const { note, setNote } = useCreateExpenseStore();

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={() => setIsNoteOpen(!isNoteOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-left text-gray-200 hover:text-white transition-colors duration-200"
      >
        <span className="text-sm font-medium">Add Note</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isNoteOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isNoteOpen && (
        <div className="mt-2">
          <textarea
            placeholder="Enter note (optional)"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white resize-none"
          />
        </div>
      )}
    </div>
  );
}
