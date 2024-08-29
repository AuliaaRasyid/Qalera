import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebar } from "../assets/data";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = sidebar.findIndex((item) => item.path === currentPath);
    setActiveIndex(activeItem);
  }, [location]);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="fixed w-64 h-screen flex flex-col gap-5 bg-blue-500">
      <div className="w-full h-20"></div>
      <div className="w-full h-full px-4">
        {sidebar.map((item, index) => (
          <Link
            className={`flex flex-col mb-2 py-2 px-4 rounded-lg ${
              activeIndex === index
                ? "bg-white text-blue-500"
                : "text-white bg-none"
            }`}
            key={index}
            to={item.path}
            onClick={() => handleClick(index)}
          >
            <p>{item.name}</p>
          </Link>
        ))}
      </div>
      <div className="w-full h-20 px-4">
        <Link
          to="/login"
          className="flex flex-col mb-2 py-2 px-4 rounded-lg text-blue-500 bg-white bg-none"
          onClick={() => handleClick(null)}
        >
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
