import { Routes, Route, BrowserRouter, Navigate } from "react-router";
import Layout from "./components/Layout";
import App from "./App";
import Categories from "./features/Categories/Categories";
import NotFound from "./components/NotFound";
import CreateExpense from "./features/CreateExpense/CreateExpense";
import Summary from "./features/Summary/Summary";
import CategoryDetail from "./features/Categories/CategoryDetail";
import SubcategoryDetail from "./features/Categories/SubcategoryDetail";
import CategoriesWrapper from "./components/CategoriesWrapper";

export const router = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/expenses" replace />} />
        <Route path="expenses" element={<App />} />
        <Route path="categories" element={<CategoriesWrapper />}>
          <Route index path="" element={<Categories />} />
          <Route path=":id" element={<CategoryDetail />} />
          <Route path=":id/:subcategoryId" element={<SubcategoryDetail />} />
        </Route>

        <Route path="create-expense" element={<CreateExpense />} />
        <Route path="summary" element={<Summary />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
