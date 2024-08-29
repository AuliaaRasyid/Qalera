import { useState } from "react";
import { useLocation } from "react-router-dom";
import { RiMenuFill, RiCloseFill } from "react-icons/ri";
import { dataNavbar } from "../assets/data/index";
import logoQallera from "../assets/logoQallera.png";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navbarLinks = dataNavbar.filter((item) => item.id >= 1 && item.id <= 4);
  const navbarButtons = dataNavbar.filter((item) => item.id >= 5);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b-2">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto md:px-0">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logoQallera} alt="logoQallera" className="h-12" />
        </div>

        {/* Links and Buttons for Desktop */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-center">
          <ul className="flex flex-row gap-8">
            {navbarLinks.map((item) => {
              const isActive = location.pathname === item.link;
              return (
                <li
                  key={item.id}
                  className={`cursor-pointer text-base py-2 px-4 rounded-full ${
                    isActive ? "bg-primary-500 text-white" : ""
                  }`}
                >
                  <a href={item.link}>{item.name}</a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Buttons for Desktop */}
        <div className="hidden lg:flex lg:flex-none lg:gap-4">
          {navbarButtons.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="px-4 py-2 text-white transition-all duration-300 ease-in-out transform rounded-full shadow-lg bg-gradient-to-r from-primary-500 to-blue-400 hover:from-primary-600 hover:to-blue-500 hover:shadow-xl hover:-translate-y-1"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Menu Icon for Mobile */}
        <div className="flex flex-row items-center justify-center lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl focus:outline-none"
          >
            {menuOpen ? <RiCloseFill /> : <RiMenuFill />}
          </button>
        </div>

        {/* Mobile Sidebar Menu */}
        <div
          className={`fixed top-20 right-0 h-full w-64 border-l-2 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden`}
        >
          <ul className="flex flex-col gap-4 p-4 mt-20">
            {navbarLinks.map((item) => {
              const isActive = location.pathname === item.link;
              return (
                <li
                  key={item.id}
                  className={`cursor-pointer text-base py-2 px-4 rounded-full ${
                    isActive ? "bg-primary-500 text-white" : ""
                  }`}
                >
                  <a href={item.link}>{item.name}</a>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-4 p-4 mt-4">
            {navbarButtons.map((item) => (
              <a
                key={item.id}
                href={item.link}
                className="px-4 py-2 text-white transition-all duration-300 ease-in-out transform rounded-full shadow-lg bg-gradient-to-r from-primary-500 to-blue-400 hover:from-primary-600 hover:to-blue-500 hover:shadow-xl hover:-translate-y-1"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
