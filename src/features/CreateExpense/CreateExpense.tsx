import PageWrapper from "../../shared/PageWrapper";
import CreateExpenseWrapper from "./CreateExpenseWrapper";
import SubcategoryPicker from "./SubcategoryPicker";
import CompositePicker from "./CompositePicker";
import SelectionToggle from "./SelectionToggle";
import NoteCollapse from "./NoteCollapse";
import CreateButton from "./CreateButton";
import AmountInput from "./AmountInput";
import { useCreateExpenseStore } from "./store/createExpenseStore";

export type CreateExpenseProps = {
  name: string;
};

export default function CreateExpense() {
  const { selectionMethod } = useCreateExpenseStore();

  return (
    <CreateExpenseWrapper>
      {({ subcategories }) => {
        return (
          <PageWrapper title="Create Expense">
            <div className="pt-0">
              <AmountInput />

              <SelectionToggle />

              <div className="mb-4">
                <h3 className="text-lg font-medium text-white mb-4">
                  Select Subcategory
                </h3>

                {selectionMethod === "direct" ? (
                  <SubcategoryPicker subcategories={subcategories} />
                ) : (
                  <CompositePicker subcategories={subcategories} />
                )}
              </div>

              <NoteCollapse />

              <CreateButton />
            </div>
          </PageWrapper>
        );
      }}
    </CreateExpenseWrapper>
  );
}
