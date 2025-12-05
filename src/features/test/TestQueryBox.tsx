import { useTestQuery } from "./useTestQuery";

const TestQueryBox = () => {
  const { isLoading, data, isError, error } = useTestQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <div className="p-2 border rounded mt-4">
      <strong>React Query test:</strong> {JSON.stringify(data)}
    </div>
  );
};

export default TestQueryBox;
