import { useState, useEffect } from "react";
import {
  RiAddFill,
  RiDeleteBinFill,
  RiEye2Fill,
  RiPencilFill,
} from "react-icons/ri";
import CreateProductMod from "../../mods/admin/product/CreateProductMod";
import ViewProductMod from "../../mods/admin/product/ViewProductMod";
import UpdateProductMod from "../../mods/admin/product/UpdateProductMod";

const DashboardProducts = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openViewModal = (product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };
  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedProduct(null);
  };

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedProduct(null);
  };

  // Example product data
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/product');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/product/${productId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchProducts(); // Refresh the list after deletion
        } else {
          console.error("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const getImageUrl = (imageName) => {
    return `http://localhost:3000/uploads/product/${imageName}`;
  }

  return (
    <div className="flex flex-col w-full h-full gap-8 p-10 bg-blue-100">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard Products</h1>
        <button
          onClick={openCreateModal}
          className="flex items-center px-4 py-2 space-x-2 text-white transition-transform duration-200 ease-in-out transform bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105"
        >
          <RiAddFill className="text-3xl" />
          <p className="text-lg">New Product</p>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product.productId} className="relative w-full h-full p-5 transition duration-500 transform bg-white shadow-lg rounded-2xl">
          <div className="w-full h-48 mb-5 overflow-hidden">
            <img
              src={getImageUrl(product.productImage)}
              alt={product.productName}
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-800">{product.productName}</h1>
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">{product.productDescription}</p>
          <div className="flex justify-between mt-6 space-x-2">
            <button
              onClick={() => openViewModal(product)}
              className="flex items-center justify-center w-1/3 px-4 py-2 text-white transition-transform duration-200 ease-in-out transform bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105"
            >
              <RiEye2Fill />
            </button>
            <button
              onClick={() => openUpdateModal(product)}
              className="flex items-center justify-center w-1/3 px-4 py-2 text-white transition-transform duration-200 ease-in-out transform bg-green-600 rounded-full shadow-lg hover:bg-green-700 hover:scale-105"
            >
              <RiPencilFill />
            </button>
            <button onClick={() => handleDelete(product.productId)} className="flex items-center justify-center w-1/3 px-4 py-2 text-white transition-transform duration-200 ease-in-out transform bg-red-600 rounded-full shadow-lg hover:bg-red-700 hover:scale-105">
              <RiDeleteBinFill />
            </button>
          </div>
        </div>
        ))}
      </div>

      {/* Modals */}
      {isCreateModalOpen && <CreateProductMod onClose={closeCreateModal} onCreated={fetchProducts} />}
      {isViewModalOpen && selectedProduct && (
        <ViewProductMod
          isVisible={isViewModalOpen}
          onClose={closeViewModal}
          productId={selectedProduct?.productId}
        />
      )}
      {isUpdateModalOpen && selectedProduct && (
        <UpdateProductMod
          onUpdated={fetchProducts}
          onClose={closeUpdateModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default DashboardProducts;
