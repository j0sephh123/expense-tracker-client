import { Routes, Route, BrowserRouter, Navigate } from "react-router";
import Layout from "./components/Layout";
import App from "./App";
import Categories from "./features/Categories/Categories";
import NotFound from "./components/NotFound";
import CreateExpense from "./features/CreateExpense/CreateExpense";
import Summary from "./features/Summary/Summary";

export const router = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/expenses" replace />} />
        <Route path="expenses" element={<App />} />
        <Route path="categories" element={<Categories />} />
        <Route path="create-expense" element={<CreateExpense />} />
        <Route path="summary" element={<Summary />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
