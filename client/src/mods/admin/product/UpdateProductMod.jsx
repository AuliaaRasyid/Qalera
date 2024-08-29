import { useState, useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";

const UpdateProductMod = ({ onClose, onUpdated, product }) => {
  const [formData, setFormData] = useState({
    productName: product?.productName || "",
    productImage: null,
    productDescription: product?.productDescription || "",
  });
  const [currentImageName, setCurrentImageName] = useState(product?.productImage || "");

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName || "",
        productImage: null,
        productDescription: product.productDescription || "",
      });
      setCurrentImageName(product.productImage || "");
    }
  }, [product]);

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      productImage: e.target.files[0],
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append('productName', formData.productName);
    updatedData.append('productDescription', formData.productDescription);
    
    if (formData.productImage) {
      updatedData.append('productImage', formData.productImage);
    } else {
      updatedData.append('currentImageName', currentImageName);
    }

    console.log("Form data being sent:", {
      productName: formData.productName,
      productDescription: formData.productDescription,
      productImage: formData.productImage ? formData.productImage.name : 'No new image',
      currentImageName: currentImageName
    });

    try {
      const response = await fetch(`http://localhost:3000/api/product/${product.productId}`, {
        method: 'PUT',
        body: updatedData,
      });
      if (response.ok) {
        onUpdated(); // Refresh the product list
        onClose(); // Close the modal on successful update
      } else {
        const errorData = await response.json();
        console.error("Failed to update product:", errorData.message);
        alert(`Failed to update product: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute p-2 text-gray-500 top-2 right-2 hover:text-gray-700"
        >
          <RiCloseFill className="text-2xl" />
        </button>
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Update Product</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="productName"
            placeholder="Product Title"
            value={formData.productName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {currentImageName && !formData.productImage && (
              <p className="mt-2 text-sm text-gray-600">Current image: {currentImageName}</p>
            )}
          </div>
          <textarea
            name="productDescription"
            placeholder="Product Description"
            value={formData.productDescription}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          ></textarea>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductMod;