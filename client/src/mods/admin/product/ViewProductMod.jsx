import { RiCloseFill } from "react-icons/ri";
import { useState, useEffect } from "react";

const ViewProductMod = ({ onClose, isVisible, productId }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isVisible) {
      setIsMounted(true);
    } else {
      setTimeout(() => setIsMounted(false), 300); // Duration should match CSS transition duration
    }
  }, [isVisible]);

  useEffect(() => {
    if (productId && isVisible) {
      ferchProductDetails();
    }
  }, [productId, isVisible]);

  const ferchProductDetails = async () => {
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/product/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const getImageUrl = (imageName) => {
    return `http://localhost:3000/uploads/product/${imageName}`;
  }

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-y-0 right-0 flex flex-col w-full max-w-md bg-gradient-to-b from-blue-600 to-blue-400 shadow-2xl transform transition-transform duration-300 ${isVisible ? "translate-x-0" : "translate-x-full"
        }`}
    >
      <div className="relative flex items-center justify-between p-4 bg-blue-800">
        <h2 className="text-lg font-bold text-white">Product Details</h2>
        <button
          onClick={onClose}
          className="text-white transition-transform duration-200 transform hover:scale-110 hover:text-red-500"
        >
          <RiCloseFill className="text-3xl" />
        </button>
      </div>
      <div className="flex flex-col p-6 space-y-4 bg-white">
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : product ? (
          <>
            <h3 className="text-xl font-semibold text-gray-800">{product.productName}</h3>
            <div className="flex justify-center">
              <img
                src={getImageUrl(product.productImage)}
                alt={product.productName}
                className="object-contain h-48"
              />
            </div>
            <div className="mt-4">
              <h4 className="mb-2 text-lg font-medium text-gray-800">
                Description
              </h4>
              <p className="text-gray-600">{product.productDescription}</p>
            </div>
            {/* Add any additional product information here */}
          </>
        ) : (
          <p className="text-center text-gray-600">No product details found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewProductMod;
