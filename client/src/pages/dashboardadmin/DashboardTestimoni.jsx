import { useState, useEffect } from "react";
import {
  RiAddFill,
  RiDeleteBinFill,
  RiEye2Fill,
  RiPencilFill,
} from "react-icons/ri";
import CreateTestimoniMod from "../../mods/admin/testimoni/CreateTestimoniMod";
import ViewTestimoniMod from "../../mods/admin/testimoni/ViewTestimoniMod";
import UpdateTestimoniMod from "../../mods/admin/testimoni/UpdateTestimoniMod";

const DashboardTestimonis = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [testimonis, setTestimonis] = useState([]);
  const [selectedTestimoni, setSelectedTestimoni] = useState(null);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openViewModal = (testimoni) => {
    setSelectedTestimoni(testimoni);
    setIsViewModalOpen(true);
  };
  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedTestimoni(null);
  };

  const openUpdateModal = (testimoni) => {
    setSelectedTestimoni(testimoni);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedTestimoni(null);
  };

  // Example testimoni data
  useEffect(() => {
    fetchTestimonis();
  }, []);

  const fetchTestimonis = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/testimoni');
      if (response.ok) {
        const data = await response.json();
        setTestimonis(data);
      } else {
        console.error("Failed to fetch testimonis");
      }
    } catch (error) {
      console.error("Error fetching testimonis:", error);
    }
  };

  const handleDelete = async (testimoniId) => {
    if (window.confirm("Are you sure you want to delete this testimoni?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/testimoni/${testimoniId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchTestimonis(); // Refresh the list after deletion
        } else {
          console.error("Failed to delete testimoni");
        }
      } catch (error) {
        console.error("Error deleting testimoni:", error);
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-8 p-10 bg-blue-100">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard Testimonis</h1>
        <button
          onClick={openCreateModal}
          className="flex items-center px-4 py-2 space-x-2 text-white transition-transform duration-200 ease-in-out transform bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105"
        >
          <RiAddFill className="text-3xl" />
          <p className="text-lg">New Testimoni</p>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-8">
      {testimonis.map((testimoni) => (
        <div key={testimoni.testimoniId} className="relative w-full h-full p-5 transition duration-500 transform bg-white shadow-lg rounded-2xl">
          <h1 className="text-xl font-bold text-gray-800">{testimoni.testimoniName}</h1>
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">{testimoni.testimoniDescription}</p>
          <h1 className="mt-2 text-sm text-gray-600 line-clamp-3">{testimoni.testimoniCompany}</h1>
          <div className="flex justify-between mt-6 space-x-2">
            <button
              onClick={() => openViewModal(testimoni)}
              className="flex items-center justify-center w-1/3 px-4 py-2 text-white transition-transform duration-200 ease-in-out transform bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105"
            >
              <RiEye2Fill />
            </button>
            <button
              onClick={() => openUpdateModal(testimoni)}
              className="flex items-center justify-center w-1/3 px-4 py-2 text-white transition-transform duration-200 ease-in-out transform bg-green-600 rounded-full shadow-lg hover:bg-green-700 hover:scale-105"
            >
              <RiPencilFill />
            </button>
            <button onClick={() => handleDelete(testimoni.testimoniId)} className="flex items-center justify-center w-1/3 px-4 py-2 text-white transition-transform duration-200 ease-in-out transform bg-red-600 rounded-full shadow-lg hover:bg-red-700 hover:scale-105">
              <RiDeleteBinFill />
            </button>
          </div>
        </div>
        ))}
      </div>

      {/* Modals */}
      {isCreateModalOpen && <CreateTestimoniMod onClose={closeCreateModal} onCreated={fetchTestimonis} />}
      {isViewModalOpen && selectedTestimoni && (
        <ViewTestimoniMod
          isVisible={isViewModalOpen}
          onClose={closeViewModal}
          testimoniId={selectedTestimoni?.testimoniId}
        />
      )}
      {isUpdateModalOpen && selectedTestimoni && (
        <UpdateTestimoniMod
          onUpdated={fetchTestimonis}
          onClose={closeUpdateModal}
          testimoni={selectedTestimoni}
        />
      )}
    </div>
  );
};

export default DashboardTestimonis;
