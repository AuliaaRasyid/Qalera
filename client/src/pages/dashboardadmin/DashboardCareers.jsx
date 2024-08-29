import { useState, useEffect } from "react";
import { RiAddFill, RiDeleteBinFill, RiEye2Fill, RiPencilFill } from "react-icons/ri";
import CreateCareerMod from "../../mods/admin/career/CreateCareerMod";
import ViewCareerMod from "../../mods/admin/career/ViewCareerMod";
import UpdateCareerMod from "../../mods/admin/career/UpdateCareerMod";

const DashboardCareers = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [careers, setCareers] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openViewModal = (career) => {
    setSelectedCareer(career);
    setIsViewModalOpen(true);
  };
  const closeViewModal = () => setIsViewModalOpen(false);

  const openUpdateModal = (career) => {
    setSelectedCareer(career);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/career');
      if (response.ok) {
        const data = await response.json();
        setCareers(data);
      } else {
        console.error("Failed to fetch careers");
      }
    } catch (error) {
      console.error("Error fetching careers:", error);
    }
  };

  const handleDelete = async (careerId) => {
    if (window.confirm("Are you sure you want to delete this career?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/career/${careerId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchCareers(); // Refresh the list after deletion
        } else {
          console.error("Failed to delete career");
        }
      } catch (error) {
        console.error("Error deleting career:", error);
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-8 p-10 bg-blue-100 ">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard Careers</h1>
        <button 
          onClick={openCreateModal}
          className="flex items-center px-4 py-2 space-x-2 text-white transition-transform duration-200 ease-in-out transform bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105"
        >
          <RiAddFill className="text-3xl" />
          <p className="text-lg">New Career</p>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {careers.map((career) => (
          <div key={career.careerId} className="w-full h-full p-6 transition-transform duration-300 ease-in-out transform bg-white shadow-lg rounded-2xl">
            <h1 className="text-xl font-bold text-gray-800">{career.careerTitle}</h1>
            <h2 className="text-lg text-gray-600">{career.careerPosition}</h2>
            <div className="flex flex-col mt-4 space-y-2 text-gray-600">
              <p className="text-sm">Location: {career.careerLocation}</p>
              <p className="text-sm">Date: {new Date(career.careerDate).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-between mt-6 space-x-2">
              <button 
                onClick={() => openViewModal(career)}
                className="flex items-center justify-center w-1/3 px-4 py-2 text-white transition-transform duration-200 ease-in-out transform bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105"
              >
                <RiEye2Fill />
              </button>
              <button 
                onClick={() => openUpdateModal(career)}
                className="flex items-center justify-center w-1/3 px-4 py-2 text-white transition-transform duration-200 ease-in-out transform bg-green-600 rounded-full shadow-lg hover:bg-green-700 hover:scale-105"
              >
                <RiPencilFill />
              </button>
              <button 
                onClick={() => handleDelete(career.careerId)}
                className="flex items-center justify-center w-1/3 px-4 py-2 text-white transition-transform duration-200 ease-in-out transform bg-red-600 rounded-full shadow-lg hover:bg-red-700 hover:scale-105"
              >
                <RiDeleteBinFill />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {isCreateModalOpen && <CreateCareerMod onClose={closeCreateModal} onCreated={fetchCareers} />}
      {isViewModalOpen && <ViewCareerMod isVisible={isViewModalOpen} onClose={closeViewModal} careerId={selectedCareer?.careerId} />}
      {isUpdateModalOpen && <UpdateCareerMod onClose={closeUpdateModal} career={selectedCareer} onUpdated={fetchCareers} />}
    </div>
  );
};

export default DashboardCareers;
