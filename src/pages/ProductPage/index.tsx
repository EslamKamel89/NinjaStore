import { Link, useParams } from "react-router-dom";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Product — {id}</h1>
      <p className="mt-2">
        Product details will appear here. We'll fetch product with id:{" "}
        <strong>{id}</strong>
      </p>
      <div className="mt-4">
        <Link to="/" className="underline">
          Back to home
        </Link>
      </div>
    </main>
  );
};

export default ProductPage;
