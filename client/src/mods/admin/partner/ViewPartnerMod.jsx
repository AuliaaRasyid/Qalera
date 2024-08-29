import { RiCloseFill } from "react-icons/ri";
import { useState, useEffect } from "react";

const ViewPartnerMod = ({ onClose, isVisible, partnerId }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [partner, setPartner] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isVisible) {
      setIsMounted(true);
    } else {
      setTimeout(() => setIsMounted(false), 300); // Duration should match CSS transition duration
    }
  }, [isVisible]);

  useEffect(() => {
    if (partnerId && isVisible) {
      ferchPartnerDetails();
    }
  }, [partnerId, isVisible]);

  const ferchPartnerDetails = async () => {
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/partner/${partnerId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch partner details');
      }
      const data = await response.json();
      setPartner(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const getImageUrl = (imageName) => {
    return `http://localhost:3000/uploads/partner/${imageName}`;
  }

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-y-0 right-0 flex flex-col w-full max-w-md bg-gradient-to-b from-blue-600 to-blue-400 shadow-2xl transform transition-transform duration-300 ${isVisible ? "translate-x-0" : "translate-x-full"
        }`}
    >
      <div className="relative flex items-center justify-between p-4 bg-blue-800">
        <h2 className="text-lg font-bold text-white">Partner Details</h2>
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
        ) : partner ? (
          <>
            <h3 className="text-xl font-semibold text-gray-800">{partner.partnerName}</h3>
            <div className="flex justify-center">
              <img
                src={getImageUrl(partner.partnerImage)}
                alt={partner.partnerName}
                className="object-contain h-48"
              />
            </div>
            <div className="mt-4">
            </div>
            {/* Add any additional partner information here */}
          </>
        ) : (
          <p className="text-center text-gray-600">No partner details found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewPartnerMod;
