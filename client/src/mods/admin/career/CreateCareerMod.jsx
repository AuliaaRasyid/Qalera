import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";

const CreateCareerMod = ({ onClose, onCreated }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    careerTitle: "",
    careerLocation: "",
    careerPosition: "",
    careerDescription: "",
    careerRequirements: "",
    careerDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform any necessary logic to save the form data
    try {
      const response = await fetch('http://localhost:3000/api/career', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        onCreated(); // Refresh the career list
        onClose(); // Close the modal on successful submission
      }
    } catch (error) {
      console.error("Error creating career:", error);
    }
  };

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute p-2 text-gray-500 top-2 right-2 hover:text-gray-700"
        >
          <RiCloseFill className="text-2xl" />
        </button>
        {step === 1 && (
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Create New Career</h2>
            <div className="flex flex-col gap-4">
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
              <button
                onClick={nextStep}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Create New Career</h2>
            <div className="flex flex-col gap-4">
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

              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCareerMod;
