import { useParams, useNavigate } from "react-router";
import { useCategory, useSubcategory } from "../api/categories";

export default function Breadcrumbs() {
  const { id, subcategoryId } = useParams();
  const navigate = useNavigate();
  const { data: category } = useCategory(id || "");
  const { data: subcategory } = useSubcategory(subcategoryId || "");

  if (!id) {
    return null;
  }

  const breadcrumbs = [
    {
      name: "Categories",
      path: "/categories",
      onClick: () => navigate("/categories"),
    },
  ];

  if (category) {
    breadcrumbs.push({
      name: category.name,
      path: `/categories/${id}`,
      onClick: () => navigate(`/categories/${id}`),
    });
  }

  if (subcategoryId && subcategory) {
    breadcrumbs.push({
      name: subcategory.name,
      path: `/categories/${id}/${subcategoryId}`,
      onClick: () => {},
    });
  } else if (subcategoryId) {
    breadcrumbs.push({
      name: `Subcategory ${subcategoryId}`,
      path: `/categories/${id}/${subcategoryId}`,
      onClick: () => {},
    });
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400 mt-10 mb-2">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.path} className="flex items-center">
          {index > 0 && <span className="mx-2 text-gray-500">/</span>}
          <button
            onClick={breadcrumb.onClick}
            className={`hover:text-white transition-colors ${
              index === breadcrumbs.length - 1
                ? "text-white font-medium"
                : "text-gray-400"
            }`}
            disabled={index === breadcrumbs.length - 1}
          >
            {breadcrumb.name}
          </button>
        </div>
      ))}
    </nav>
  );
}
