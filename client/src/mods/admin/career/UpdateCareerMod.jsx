import { useState, useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";

const UpdateCareerMod = ({ onClose, career, onUpdated }) => {
  const [formData, setFormData] = useState(career || {});

  useEffect(() => {
    setFormData(career || {});
  }, [career]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/career/${formData.careerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        onUpdated(); // Refresh the career list
        onClose(); // Close the modal on successful update
      } else {
        console.error("Failed to update career");
      }
    } catch (error) {
      console.error("Error updating career:", error);
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
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Update Career</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="careerTitle"
            value={formData.careerTitle}
            onChange={handleChange}
            placeholder="Job Title"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="careerPosition"
            value={formData.careerPosition}
            onChange={handleChange}
            placeholder="Position"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="careerLocation"
            value={formData.careerLocation}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <textarea
            name="careerDescription"
            value={formData.careerDescription}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded-lg"
          ></textarea>
          <textarea
            name="careerRequirements"
            value={formData.careerRequirements}
            onChange={handleChange}
            placeholder="Qualifications"
            className="w-full p-2 border border-gray-300 rounded-lg"
          ></textarea>
          <input
            type="date"
            name="careerDate"
            value={formData.careerDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />

          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCareerMod;
