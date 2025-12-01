import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage: React.FC = () => {
  const q = useQuery().get("q") || "";
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Search</h1>
      <p className="mt-2">
        Search results for: <strong>{q}</strong>
      </p>
    </main>
  );
};

export default SearchPage;
