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
    <section className="flex flex-col md:flex-row md:items-end gap-3">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Search
        </label>
        <input
          type="text"
          onChange={handleSearchChange}
          value={q}
          placeholder="Search products..."
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>
      <div className="w-full md:w-56">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          title="category-selector"
          className="w-full border rounded px-3 py-2 text-sm bg-white"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          {categories?.map((category) => (
            <option value={category.slug} key={`category-${category.id}`}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default ProductFilters;
