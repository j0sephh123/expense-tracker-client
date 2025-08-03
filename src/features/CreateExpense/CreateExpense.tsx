import PageWrapper from "../../shared/PageWrapper";

export default function CreateExpense() {
  const mockOptions = [
    { value: "food", label: "Food & Dining" },
    { value: "transport", label: "Transportation" },
    { value: "shopping", label: "Shopping" },
    { value: "entertainment", label: "Entertainment" },
    { value: "health", label: "Healthcare" },
    { value: "utilities", label: "Utilities" },
    { value: "housing", label: "Housing" },
    { value: "education", label: "Education" },
    { value: "travel", label: "Travel" },
    { value: "groceries", label: "Groceries" },
    { value: "restaurants", label: "Restaurants" },
    { value: "coffee", label: "Coffee & Drinks" },
    { value: "gas", label: "Gas & Fuel" },
    { value: "parking", label: "Parking & Tolls" },
    { value: "public_transport", label: "Public Transport" },
    { value: "clothing", label: "Clothing & Apparel" },
    { value: "electronics", label: "Electronics" },
    { value: "books", label: "Books & Media" },
    { value: "movies", label: "Movies & Shows" },
    { value: "games", label: "Games & Hobbies" },
    { value: "gym", label: "Gym & Fitness" },
    { value: "pharmacy", label: "Pharmacy" },
    { value: "doctor", label: "Doctor Visits" },
    { value: "dental", label: "Dental Care" },
    { value: "electricity", label: "Electricity" },
    { value: "water", label: "Water & Sewage" },
    { value: "internet", label: "Internet & Phone" },
    { value: "rent", label: "Rent" },
    { value: "mortgage", label: "Mortgage" },
    { value: "insurance", label: "Insurance" },
    { value: "tuition", label: "Tuition & Fees" },
    { value: "books_supplies", label: "Books & Supplies" },
    { value: "flights", label: "Flights" },
    { value: "hotels", label: "Hotels & Lodging" },
    { value: "car_rental", label: "Car Rental" },
    { value: "souvenirs", label: "Souvenirs" },
    { value: "gifts", label: "Gifts" },
    { value: "charity", label: "Charity & Donations" },
    { value: "taxes", label: "Taxes" },
    { value: "fees", label: "Banking Fees" },
    { value: "repairs", label: "Home Repairs" },
    { value: "maintenance", label: "Car Maintenance" },
    { value: "pet_care", label: "Pet Care" },
    { value: "beauty", label: "Beauty & Personal Care" },
    { value: "other", label: "Other" },
  ];

  return (
    <PageWrapper title="Create Expense">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-white">Create Expense</h1>

        <div className="mb-4">
          <label
            htmlFor="category-select"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Category
          </label>
          <select
            id="category-select"
            className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
          >
            <option value="" className="bg-gray-800 text-white">
              Select a category
            </option>
            {mockOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-gray-800 text-white"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </PageWrapper>
  );
}
