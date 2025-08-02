export interface Expense {
  id: number;
  amount: number;
  subcategory_id: number;
  user_id: number | null;
  note: string | null;
  created_at: string;
  user_email?: string;
  subcategory_name?: string;
  category_id?: number;
  category_name?: string;
}
