import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";

const CreateProductMod = ({ onClose, onCreated }) => {
  const [productData, setProductData] = useState({
    productName: "",
    productImage: null,
    productDescription: "",
  });

  const handleImageChange = (e) => {
    setProductData({
      ...productData,
      productImage: e.target.files[0],
    });
  };

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('productName', productData.productName);
    formData.append('productImage', productData.productImage);
    formData.append('productDescription', productData.productDescription);

    try {
      const response = await fetch('http://localhost:3000/api/product', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        onCreated(); // Refresh the product list
        onClose(); // Close the modal on successful submission
      } else {
        console.error("Failed to create product:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating product:", error);
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
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Create New Product</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="productName"
            placeholder="Product Title"
            value={productData.productName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            name="productDescription"
            placeholder="Product Description"
            value={productData.productDescription}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          ></textarea>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductMod;
