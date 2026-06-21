import ProductCard from "./ProductCard";

const ProductGrid = ({ products = [] }) => {
  if (!products?.length) {
    return (
      <div className="text-center py-10 text-gray-600">No products found.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id || product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;

