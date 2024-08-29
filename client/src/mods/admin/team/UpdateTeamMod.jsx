import { useState, useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";

const UpdateTeamMod = ({ onClose, onUpdated, team }) => {
  const [formData, setFormData] = useState({
    teamName: team?.teamName || "",
    teamImage: null,
    teamDescription: team?.teamDescription || "",
  });
  const [currentImageName, setCurrentImageName] = useState(team?.teamImage || "");

  useEffect(() => {
    if (team) {
      setFormData({
        teamName: team.teamName || "",
        teamImage: null,
        teamPosition: team.teamPosition || "",
      });
      setCurrentImageName(team.teamImage || "");
    }
  }, [team]);

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      teamImage: e.target.files[0],
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
    updatedData.append('teamName', formData.teamName);
    updatedData.append('teamPosition', formData.teamPosition);
    
    if (formData.teamImage) {
      updatedData.append('teamImage', formData.teamImage);
    } else {
      updatedData.append('currentImageName', currentImageName);
    }

    console.log("Form data being sent:", {
      teamName: formData.teamName,
      teamPosition: formData.teamPosition,
      teamImage: formData.teamImage ? formData.teamImage.name : 'No new image',
      currentImageName: currentImageName
    });

    try {
      const response = await fetch(`http://localhost:3000/api/team/${team.teamId}`, {
        method: 'PUT',
        body: updatedData,
      });
      if (response.ok) {
        onUpdated(); // Refresh the team list
        onClose(); // Close the modal on successful update
      } else {
        const errorData = await response.json();
        console.error("Failed to update team:", errorData.message);
        alert(`Failed to update team: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating team:", error);
      alert("Error updating team. Please try again.");
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
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Update Team</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="teamName"
            placeholder="Team Title"
            value={formData.teamName}
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
            {currentImageName && !formData.teamImage && (
              <p className="mt-2 text-sm text-gray-600">Current image: {currentImageName}</p>
            )}
          </div>
          <textarea
            name="teamPosition"
            placeholder="Team Position"
            value={formData.teamPosition}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          ></textarea>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Update Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTeamMod;