import { useState, useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";

const UpdatePartnerMod = ({ onClose, onUpdated, partner }) => {
  const [formData, setFormData] = useState({
    partnerName: partner?.partnerName || "",
    partnerImage: null,
  });
  const [currentImageName, setCurrentImageName] = useState(partner?.partnerImage || "");

  useEffect(() => {
    if (partner) {
      setFormData({
        partnerName: partner.partnerName || "",
        partnerImage: null,
      });
      setCurrentImageName(partner.partnerImage || "");
    }
  }, [partner]);

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      partnerImage: e.target.files[0],
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
    updatedData.append('partnerName', formData.partnerName);
    
    if (formData.partnerImage) {
      updatedData.append('partnerImage', formData.partnerImage);
    } else {
      updatedData.append('currentImageName', currentImageName);
    }

    console.log("Form data being sent:", {
      partnerName: formData.partnerName,
      partnerImage: formData.partnerImage ? formData.partnerImage.name : 'No new image',
      currentImageName: currentImageName
    });

    try {
      const response = await fetch(`http://localhost:3000/api/partner/${partner.partnerId}`, {
        method: 'PUT',
        body: updatedData,
      });
      if (response.ok) {
        onUpdated(); // Refresh the partner list
        onClose(); // Close the modal on successful update
      } else {
        const errorData = await response.json();
        console.error("Failed to update partner:", errorData.message);
        alert(`Failed to update partner: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating partner:", error);
      alert("Error updating partner. Please try again.");
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
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Update Partner</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="partnerName"
            placeholder="Partner Title"
            value={formData.partnerName}
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
            {currentImageName && !formData.partnerImage && (
              <p className="mt-2 text-sm text-gray-600">Current image: {currentImageName}</p>
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Update Partner
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePartnerMod;