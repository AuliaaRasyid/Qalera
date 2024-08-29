import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";

const CreateTestimoniMod = ({ onClose, onCreated }) => {
  const [testimoniData, setTestimoniData] = useState({
    testimoniName: "",
    testimoniDescription: "",
    testimoniCompany: "",
  });

  const handleChange = (e) => {
    setTestimoniData({
      ...testimoniData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/testimoni', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testimoniData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        onCreated(); // Refresh the testimoni list
        onClose(); // Close the modal on successful submission
      } else {
        console.error("Failed to create testimoni:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating testimoni:", error);
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
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Create New Testimoni</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="testimoniName"
            placeholder="Testimoni Title"
            value={testimoniData.testimoniName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="testimoniCompany"
            placeholder="Testimoni Company"
            value={testimoniData.testimoniCompany}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            name="testimoniDescription"
            placeholder="Testimoni Description"
            value={testimoniData.testimoniDescription}
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

export default CreateTestimoniMod;
