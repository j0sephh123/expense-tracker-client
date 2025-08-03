import { Routes, Route, BrowserRouter, Navigate } from "react-router";
import Layout from "./components/Layout";
import App from "./App";
import NotFound from "./components/NotFound";
import CreateExpense from "./features/CreateExpense/CreateExpense";
import CreateCategory from "./features/Categories/CreateCategory";
import CategoryDetail from "./features/Categories/CategoryDetail";
import CategoryExpenses from "./features/Expenses/CategoryExpenses";
import SubcategoryDetail from "./features/Subcategories/SubcategoryDetail";
import CategoriesWrapper from "./components/CategoriesWrapper";
import Categories from "./features/Categories/Categories";
import Login from "./features/Auth/Login";
import ProtectedRoute from "./features/Auth/ProtectedRoute";

export const router = (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/expenses" replace />} />
        <Route path="expenses" element={<App />} />
        <Route path="categories" element={<CategoriesWrapper />}>
          <Route index path="" element={<Categories />} />
          <Route path=":id" element={<CategoryDetail />} />
          <Route path=":id/expenses" element={<CategoryExpenses />} />
          <Route path=":id/expenses/:month" element={<CategoryExpenses />} />
          <Route path=":id/:subcategoryId" element={<SubcategoryDetail />} />
          <Route
            path=":id/:subcategoryId/:month"
            element={<SubcategoryDetail />}
          />
        </Route>

        <Route path="create-expense" element={<CreateExpense />} />
        <Route path="create-category" element={<CreateCategory />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
