const PaginationControls: React.FC<{
  page?: number;
  pages?: number;
  onPageChange: (page: number) => void;
}> = ({ page, pages, onPageChange }) => {
  if (!page || !pages || pages <= 1) return null;
  const visibleRange = 2;
  const start = Math.max(1, page - visibleRange);
  const end = Math.min(pages, page + visibleRange);
  const pageArr = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  return (
    <nav aria-label="Pagination" className="mt-4 flex items-center gap-2">
      <button
        onClick={() => Math.max(1, page - 1)}
        disabled={page === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>
      {pageArr.map((p) => (
        <button
          onClick={() => onPageChange(p)}
          key={`pagination-button-${p}`}
          className={`px-3 py-1 border rounded ${
            p === page ? "bg-gray-200" : ""
          }`}
        >
          {p}
        </button>
      ))}
      {end < pages && <span className="px-2">...</span>}
      <button
        onClick={() => onPageChange(Math.min(page + 1, pages))}
        disabled={page === pages}
        className="px-3 py-1 border rounded disabled:opacity-50 ml-2"
      >
        Next
      </button>
    </nav>
  );
};

export default PaginationControls;
