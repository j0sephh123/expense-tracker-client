export interface Expense {
  id: number;
  amount: number;
  subcategory_id: number;
  user_id: number | null;
  note: string | null;
  created_at: string;
  category?: {
    id: number;
    name: string;
  };
  subcategory?: {
    id: number;
    name: string;
    category_id: number;
  };
}
