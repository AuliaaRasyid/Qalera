import { useState, useEffect } from "react";
import {
  RiAddFill,
  RiDeleteBinFill,
  RiEye2Fill,
  RiPencilFill,
} from "react-icons/ri";
import ViewPartnerMod from "../../mods/admin/partner/ViewPartnerMod";
import UpdatePartnerMod from "../../mods/admin/partner/UpdatePartnerMod";
import CreatePartnerMod from "../../mods/admin/partner/CreatePartnerMod";

const DashboardPartners = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openViewModal = (partner) => {
    setSelectedPartner(partner);
    setIsViewModalOpen(true);
  };
  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedPartner(null);
  };

  const openUpdateModal = (partner) => {
    setSelectedPartner(partner);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedPartner(null);
  };

  // Example partner data
  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/partner');
      if (response.ok) {
        const data = await response.json();
        setPartners(data);
      } else {
        console.error("Failed to fetch partners");
      }
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  const handleDelete = async (partnerId) => {
    if (window.confirm("Are you sure you want to delete this partner?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/partner/${partnerId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchPartners(); // Refresh the list after deletion
        } else {
          console.error("Failed to delete partner");
        }
      } catch (error) {
        console.error("Error deleting partner:", error);
      }
    }
  };

  const getImageUrl = (imageName) => {
    return `http://localhost:3000/uploads/partner/${imageName}`;
  }

  return (
    <div className="flex flex-col w-full h-full gap-8 p-10 bg-blue-100">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard Partners</h1>
        <button
          onClick={openCreateModal}
          className="flex items-center px-4 py-2 space-x-2 text-white transition-transform duration-200 ease-in-out transform bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105"
        >
          <RiAddFill className="text-3xl" />
          <p className="text-lg">New Partner</p>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-8">
      {partners.map((partner) => (
        <div key={partner.partnerId} className="relative w-full h-full p-5 transition duration-500 transform bg-white shadow-lg rounded-2xl">
          <div className="w-full h-48 mb-5 overflow-hidden">
            <img
              src={getImageUrl(partner.partnerImage)}
              alt={partner.partnerName}
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-800">{partner.partnerName}</h1>
          <div className="flex justify-between mt-6 space-x-2">
            <button
              onClick={() => openViewModal(partner)}
              className="flex items-center justify-center w-1/3 px-4 py-2 text-white transition-transform duration-200 ease-in-out transform bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105"
            >
              <RiEye2Fill />
            </button>
            <button
              onClick={() => openUpdateModal(partner)}
              className="flex items-center justify-center w-1/3 px-4 py-2 text-white transition-transform duration-200 ease-in-out transform bg-green-600 rounded-full shadow-lg hover:bg-green-700 hover:scale-105"
            >
              <RiPencilFill />
            </button>
            <button onClick={() => handleDelete(partner.partnerId)} className="flex items-center justify-center w-1/3 px-4 py-2 text-white transition-transform duration-200 ease-in-out transform bg-red-600 rounded-full shadow-lg hover:bg-red-700 hover:scale-105">
              <RiDeleteBinFill />
            </button>
          </div>
        </div>
        ))}
      </div>

      {/* Modals */}
      {isCreateModalOpen && <CreatePartnerMod onClose={closeCreateModal} onCreated={fetchPartners} />}
      {isViewModalOpen && selectedPartner && (
        <ViewPartnerMod
          isVisible={isViewModalOpen}
          onClose={closeViewModal}
          partnerId={selectedPartner?.partnerId}
        />
      )}
      {isUpdateModalOpen && selectedPartner && (
        <UpdatePartnerMod
          onUpdated={fetchPartners}
          onClose={closeUpdateModal}
          partner={selectedPartner}
        />
      )}
    </div>
  );
};

export default DashboardPartners;
