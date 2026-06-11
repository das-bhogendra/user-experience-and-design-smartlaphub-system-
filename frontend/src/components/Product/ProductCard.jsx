import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="border rounded-lg p-4 hover:shadow-lg transition"
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
      />

      <h3 className="mt-3 font-semibold">
        {product.name}
      </h3>

      <p className="text-gray-500 text-sm">
        {product.brand}
      </p>

      <p className="font-bold mt-2">
        Rs. {product.price}
      </p>
    </Link>
  );
};

export default ProductCard;
