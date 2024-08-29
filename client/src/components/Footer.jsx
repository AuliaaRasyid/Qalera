import { dataNavbar } from "../assets/data/index";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi dalam milidetik
      once: true, // Apakah animasi hanya akan berjalan sekali atau setiap kali elemen masuk viewport
    });
  }, []);

  return (
    <footer className="w-full text-white border-t-2 bg-primary-500">
      <div data-aos="fade-up" className="container grid grid-cols-1 gap-8 px-5 py-10 mx-auto md:grid-cols-2 lg:grid-cols-4">
        {/* Company Information */}
        <div className="flex flex-col">
          <h2 className="mb-5 text-2xl font-bold">
            PT. Qallera Technology Eranusa
          </h2>
          <p className="mb-2">
            Lombard Hidge Rd 425 East Java
            <br />
            Madura City Block ABC 123
          </p>
          <p>Days Open</p>
          <p>Monday - Friday: 08 AM - 10 PM</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col">
          <h2 className="mb-5 text-2xl font-bold">Quick Links</h2>
          <ul className="space-y-2">
            {dataNavbar.map((item) => (
              <li key={item.id}>
                <a href={item.link} className="hover:underline">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Service */}
        <div className="flex flex-col">
          <h2 className="mb-5 text-2xl font-bold">Our Service</h2>
          <ul className="space-y-2">
            <li>
              <a href="#">Acquisition and Recruitment</a>
            </li>
            <li>
              <a href="#">Executive Search</a>
            </li>
            <li>
              <a href="#">Performance Management</a>
            </li>
            <li>
              <a href="#">Learning and Development</a>
            </li>
            <li>
              <a href="#">HR Consulting</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col">
          <h2 className="mb-5 text-2xl font-bold">Social Media</h2>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              className="flex items-center justify-center w-10 h-10 bg-white rounded-full text-primary-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              className="flex items-center justify-center w-10 h-10 bg-white rounded-full text-primary-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              className="flex items-center justify-center w-10 h-10 bg-white rounded-full text-primary-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div data-aos="fade-up" className="container flex flex-col items-center justify-center py-8 mx-auto text-center border-t-2">
        <p className="text-sm font-semibold text-gray-300">
          © 2022 Qallera. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
