import { Outlet } from "react-router";
import Breadcrumbs from "./Breadcrumbs";

export default function CategoriesWrapper() {
  return (
    <div>
      <Breadcrumbs />
      <Outlet />
    </div>
  );
}
