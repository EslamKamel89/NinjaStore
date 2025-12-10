import { useSearchParams } from "react-router-dom";
import { useCategories } from "../api/productsApi";

const ProductFilters: React.FC<{
  page?: number;
  q?: string;
  category?: string;
}> = ({ page, q, category }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value;
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set("q", value);
    } else {
      next.delete("q");
    }
    next.set("page", "1");
    setSearchParams(next);
  };
  const handleCategoryChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const value = event.target.value;
    const next = new URLSearchParams();
    if (value) {
      next.set("category", value);
    } else {
      next.delete("category");
    }
    next.set("page", "1");
    setSearchParams(next);
  };
  return (
    <section className="bg-white border border-gray-100 shadow-sm rounded-lg p-4 md:p-6 flex flex-col md:flex-row gap-4 md:items-end">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search
        </label>
        <input
          type="text"
          onChange={handleSearchChange}
          value={q}
          placeholder="Search products..."
          className="w-full border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          aria-label="Search products"
        />
      </div>
      <div className="w-full md:w-56">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <div>
          <select
            title="category-selector"
            className="w-full border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
            value={category}
            onChange={handleCategoryChange}
            aria-label="Filter by category"
            disabled={isCategoriesLoading}
          >
            <option value="">All</option>
            {categories?.map((category) => (
              <option value={category.slug} key={`category-${category.id}`}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default ProductFilters;
