import { useState, useRef } from "react";
import { careersData } from "../../assets/data";
import { RiCloseFill, RiArrowDropDownLine } from "react-icons/ri";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const CareerCard = ({ career, onClick }) => {
  return (
    <div
      className="flex flex-col justify-end flex-shrink-0 p-4 text-white bg-blue-500 border-2 cursor-pointer w-80 h-60 rounded-xl"
      onClick={() => onClick(career)}
    >
      <div className="inline-block px-4 py-1 text-black bg-yellow-500 rounded-full w-fit">
        {career.department}
      </div>
      <h2 className="mt-2 text-xl font-semibold">{career.title}</h2>
      <div className="flex items-center gap-2 mt-4">
        <div className="flex items-center gap-1">
          <span className="icon">🏢</span> {/* Icon Corporate */}
          {career.division}
        </div>
        <div className="flex items-center gap-1">
          <span className="icon">📍</span> {/* Icon Location */}
          {career.location}
        </div>
      </div>
    </div>
  );
};

const CustomSelect = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-2/3 h-10 md:h-full">
      <button
        className="flex items-center justify-between w-full h-full px-6 text-left bg-white border border-gray-300 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || "Pilih Lokasi"}
        <RiArrowDropDownLine className="text-xl" />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CareerDetailsPopupLeptop = ({ career, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-1/3 p-8 bg-white rounded-xl">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute text-2xl text-gray-500 top-4 right-4 hover:text-gray-700"
        >
          <RiCloseFill />
        </button>

        <h2 className="text-2xl font-bold">{career.title}</h2>
        <h3 className="mt-2 text-lg">
          {career.department} - {career.location}
        </h3>
        <h4 className="mt-4 font-semibold">Persyaratan:</h4>
        <ul className="list-disc list-inside">
          {career.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
        <h4 className="mt-4 font-semibold">Deskripsi Pekerjaan:</h4>
        <p>{career.jobDescription}</p>

        {/* Apply Button */}
        <button
          onClick={() => alert("You have applied for this position!")}
          className="w-full px-4 py-2 mt-6 text-white rounded-full bg-primary-500 hover:bg-primary-600"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

const CareerDetailsPopupMobile = ({ career, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
      <div
        className="relative w-full p-6 bg-white rounded-t-3xl"
        style={{
          transition: "transform 0.3s ease-in-out",
          transform: "translateY(0)",
        }}
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute text-2xl text-gray-500 top-4 right-4 hover:text-gray-700"
        >
          <RiCloseFill />
        </button>

        <h2 className="text-xl font-bold">{career.title}</h2>
        <h3 className="mt-2 text-lg">
          {career.department} - {career.location}
        </h3>
        <h4 className="mt-4 font-semibold">Persyaratan:</h4>
        <ul className="list-disc list-inside">
          {career.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
        <h4 className="mt-4 font-semibold">Deskripsi Pekerjaan:</h4>
        <p>{career.jobDescription}</p>

        {/* Apply Button */}
        <button
          onClick={() => alert("You have applied for this position!")}
          className="w-full px-4 py-2 mt-6 text-white rounded-full bg-primary-500 hover:bg-primary-600"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

const Careers = () => {
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [selectedLocation, setSelectedLocation] = useState(""); // State for location filter
  const [filteredCareers, setFilteredCareers] = useState(careersData); // State for filtered careers
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleCardClick = (career) => {
    setSelectedCareer(career);
  };

  const closePopup = () => {
    setSelectedCareer(null);
  };

  const handleSearch = () => {
    const filtered = careersData.filter((career) => {
      const matchTitle = career.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchLocation = selectedLocation
        ? career.location.toLowerCase() === selectedLocation.toLowerCase()
        : true;
      return matchTitle && matchLocation;
    });
    setFilteredCareers(filtered);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi dalam milidetik
      once: true, // Apakah animasi hanya akan berjalan sekali atau setiap kali elemen masuk viewport
    });
  }, []);

  return (
    <div className="w-full h-full">
      <section className="w-full h-full pt-20">
        <div data-aos="fade-up" className="container flex flex-col px-5 py-10 mx-auto md:px-0">
          <h2 className="text-2xl">We are hiring</h2>
          <h1 className="text-4xl font-bold text-primary-500">
            Join with us...!
          </h1>
          {/* Search and Filter Section */}
          <div className="flex flex-col w-full gap-4 p-4 mt-5 rounded-3xl md:rounded-full md:h-20 md:flex-row bg-primary-500">
            <div className="w-full h-full rounded-full">
              <input
                type="text"
                placeholder="Posisi Pekerjaan"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 px-6 rounded-full md:h-full"
              />
            </div>
            <div className="flex flex-row w-full h-full gap-5">
              <CustomSelect
                options={["Jakarta Pusat", "Bandung", "Surabaya"]} // Add more options as needed
                selectedOption={selectedLocation}
                onSelect={setSelectedLocation}
              />
              <button
                className="w-1/3 h-full text-white transition-all duration-300 ease-in-out transform rounded-full shadow-lg h- bg-gradient-to-r from-primary-500 to-blue-400 hover:from-primary-600 hover:to-blue-500 hover:shadow-xl hover:-translate-y-1"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-full py-16 bg-primary-500">
        <div
          className="container px-5 mx-auto md:px-0"
          data-aos="fade-up"
        >
          <h1 className="text-4xl font-semibold text-white">Open Positions</h1>
        </div>
        <div
          className="mt-10 ml-5 overflow-x-hidden lg:ml-20 cursor-grab active:cursor-grabbing"
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          style={{ touchAction: "pan-x" }}
          data-aos="fade-right" // Animasi pada container card
        >
          <div className="flex flex-row w-full gap-10 h-60">
            {filteredCareers.map((career) => (
              <CareerCard
                key={career.id}
                career={career}
                onClick={handleCardClick}
                data-aos="zoom-in" // Animasi pada tiap card
              />
            ))}
          </div>
        </div>
      </section>
      {/* Render Popup based on screen size */}
      {selectedCareer && (
        <>
          {/* Mobile View */}
          <div className="block md:hidden">
            <CareerDetailsPopupMobile
              career={selectedCareer}
              onClose={closePopup}
            />
          </div>
          {/* Desktop View */}
          <div className="hidden md:block">
            <CareerDetailsPopupLeptop
              career={selectedCareer}
              onClose={closePopup}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Careers;
