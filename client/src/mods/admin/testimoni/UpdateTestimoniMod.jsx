import { useState, useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";

const UpdateTestimoniMod = ({ onClose, onUpdated, testimoni }) => {
  const [formData, setFormData] = useState(testimoni||{});

  useEffect(() => {
    setFormData(testimoni || {});
  }, [testimoni]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/testimoni/${formData.testimoniId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        onUpdated(); // Refresh the testimoni list
        onClose(); // Close the modal on successful update
      } else {
        console.error("Failed to update testimoni");
      }
    } catch (error) {
      console.error("Error updating testimoni:", error);
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
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Update Testimoni</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="testimoniName"
            placeholder="Testimoni Title"
            value={formData.testimoniName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            name="testimoniDescription"
            placeholder="Testimoni Description"
            value={formData.testimoniDescription}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          ></textarea>
          <input
            type="text"
            name="testimoniCompany"
            placeholder="Testimoni Company"
            value={formData.testimoniCompany}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Update Testimoni
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTestimoniMod;