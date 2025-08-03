import React from "react";
import { useSubcategoriesByExpenseCount } from "../../api/subcategories";
import PageWrapper from "../../shared/PageWrapper";
import Loading from "../../shared/Loading";
import type { SubcategoryExpenseCount } from "../../types/subcategory";

interface CreateExpenseWrapperProps {
  children: (value: {
    subcategories: SubcategoryExpenseCount[];
  }) => React.ReactNode;
}

export default function CreateExpenseWrapper({
  children,
}: CreateExpenseWrapperProps) {
  const {
    data: subcategories,
    isLoading,
    error,
  } = useSubcategoriesByExpenseCount();

  if (isLoading) {
    return (
      <PageWrapper title="Create Expense">
        <div className="p-4">
          <Loading />
        </div>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper title="Create Expense">
        <div className="p-4">
          <div className="text-red-500">Error loading subcategories</div>
        </div>
      </PageWrapper>
    );
  }

  return <div>{children({ subcategories: subcategories || [] })}</div>;
}
