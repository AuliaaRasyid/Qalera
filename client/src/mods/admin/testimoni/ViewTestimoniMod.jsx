import { RiCloseFill } from "react-icons/ri";
import { useState, useEffect } from "react";

const ViewTestimoniMod = ({ onClose, isVisible, testimoniId }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [testimoni, setCareer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isVisible) {
      setIsMounted(true);
    } else {
      setTimeout(() => setIsMounted(false), 300); // Duration should match CSS transition duration
    }
  }, [isVisible]);

  useEffect(() => {
    if (testimoniId && isVisible) {
      fetchCareerDetails();
    }
  }, [testimoniId, isVisible]);

  const fetchCareerDetails = async () => {
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/testimoni/${testimoniId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch testimoni details');
      }
      const data = await response.json();
      setCareer(data);
    } catch (err) {
      setError(err.message);
    } 
  };


  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-y-0 right-0 flex flex-col w-full max-w-md bg-gradient-to-b from-blue-600 to-blue-400 shadow-2xl transform transition-transform duration-300 ${isVisible ? "translate-x-0" : "translate-x-full"
        }`}
    >
      <div className="relative flex items-center justify-between p-4 bg-blue-800">
        <h2 className="text-lg font-bold text-white">Testimoni Details</h2>
        <button
          onClick={onClose}
          className="text-white transition-transform duration-200 transform hover:scale-110 hover:text-red-500"
        >
          <RiCloseFill className="text-3xl" />
        </button>
      </div>
      <div className="flex flex-col p-6 space-y-4 bg-white">
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : testimoni ? (
          <>
            <h3 className="text-xl font-semibold text-gray-800">{testimoni.testimoniName}</h3>
            <div className="mt-4">
              <h4 className="mb-2 text-lg font-medium text-gray-800">
                Description
              </h4>
              <p className="text-gray-600">{testimoni.testimoniDescription}</p>
            </div>
            <div className="mt-4">
              <h4 className="mb-2 text-lg font-medium text-gray-800">
                Company
              </h4>
              <p className="text-gray-600">{testimoni.testimoniCompany}</p>
            </div>
            {/* Add any additional testimoni information here */}
          </>
        ) : (
          <p className="text-center text-gray-600">No testimoni details found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewTestimoniMod;
