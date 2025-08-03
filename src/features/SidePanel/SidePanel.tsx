import { useSidePanelStore } from "./sidePanelStore";
import { X, LogOut } from "lucide-react";
import IconButton from "../../shared/IconButton/IconButton";
import { auth } from "../../utils/api";
import { useNavigate } from "react-router";
import { useState } from "react";
import {
  useGroupedExpensesBySubcategory,
  useMemberUsers,
} from "../../api/expenses";

export const SidePanel = () => {
  const { isOpen, close } = useSidePanelStore();
  const navigate = useNavigate();

  const now = new Date();
  const previousMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
  const previousYear =
    now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(previousMonth);
  const [selectedYear, setSelectedYear] = useState(previousYear);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const selectedDate = new Date(selectedYear, selectedMonth, 1);
  const { data, isLoading, error, refetch } = useGroupedExpensesBySubcategory(
    selectedDate,
    shouldFetch,
    selectedUserId
  );
  const { data: memberUsers, isLoading: loadingUsers } = useMemberUsers();

  const handleLogout = () => {
    auth.logout();
    close();
    navigate("/login");
  };

  const handleFetchData = () => {
    setShouldFetch(true);
    refetch();
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - 5 + i
  );

  const groupedByCategory =
    data?.expenses?.reduce((acc, expense) => {
      const categoryName = expense.category_name;
      if (!acc[categoryName]) {
        acc[categoryName] = {
          total: 0,
          subcategories: [],
        };
      }
      acc[categoryName].total += expense.total;
      acc[categoryName].subcategories.push(expense);
      return acc;
    }, {} as Record<string, { total: number; subcategories: typeof data.expenses }>) ||
    {};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-0 w-80 bg-bg-secondary border-r border-border shadow-lg z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-text-primary">Side Panel</h2>
        <IconButton
          onClick={close}
          variant="secondary"
          title="Close panel"
          icon={<X className="w-6 h-6" />}
        />
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="space-y-2">
          <h3 className="text-md font-medium text-text-primary">
            Monthly Summary
          </h3>

          <div className="space-y-2">
            <label className="block text-sm text-text-secondary">Month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-bg-primary border border-border rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-text-secondary">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-bg-primary border border-border rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-text-secondary">User</label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full px-3 py-2 bg-bg-primary border border-border rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Users</option>
              <option value="0">No User</option>
              {loadingUsers ? (
                <option disabled>Loading users...</option>
              ) : (
                memberUsers?.map((user) => (
                  <option key={user.id} value={user.id.toString()}>
                    {user.display_name || user.email}
                  </option>
                ))
              )}
            </select>
          </div>

          <button
            onClick={handleFetchData}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? "Loading..." : "Fetch Summary"}
          </button>

          {error && (
            <div className="text-sm text-red-400">Error loading summary</div>
          )}

          {data && (
            <div className="space-y-4">
              <div className="text-lg font-semibold text-text-primary">
                Total: {data.total}
              </div>

              <div className="space-y-3">
                {Object.entries(groupedByCategory).map(
                  ([categoryName, categoryData]) => (
                    <div
                      key={categoryName}
                      className="bg-bg-primary p-3 rounded-md"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-text-primary">
                          {categoryName}
                        </h4>
                        <span className="text-sm font-semibold text-text-primary">
                          {categoryData.total.toFixed(2)}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {categoryData.subcategories.map(
                          (subcategory, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-text-secondary">
                                {subcategory.subcategory_name}
                              </span>
                              <span className="text-text-secondary">
                                {subcategory.total.toFixed(2)}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-text-primary hover:text-red-400 transition-colors duration-200 rounded-md hover:bg-bg-primary"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
