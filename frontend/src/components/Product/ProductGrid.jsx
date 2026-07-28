import ProductCard from "./ProductCard";

const ProductGrid = ({ products = [] }) => {
  if (!products?.length) {
    return (
      <div className="text-center py-16 text-gray-500">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-lg font-medium">No products found</p>
        <p className="text-sm mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product, index) => (
        <div
          key={product._id || product.id}
          className="animate-fadeIn"
          style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;

