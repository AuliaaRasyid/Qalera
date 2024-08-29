import { RiArrowRightLine } from "react-icons/ri";
import mobileapp from "../../assets/mobileapp.jpg";
import webapp from "../../assets/webapp.jpg";
import uiuxdesign from "../../assets/uiuxdesign.jpg";
import digitalmarketing from "../../assets/digitalmarketing.jpg";
import amazon from "../../assets/amazon.svg";
import ipaymu from "../../assets/ipaymu.svg";
import Slider from "react-slick";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import building1 from "../../assets/building1.avif";
import discus from "../../assets/discus.avif";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi dalam milidetik
      once: true, // Apakah animasi hanya akan berjalan sekali atau setiap kali elemen masuk viewport
    });
  }, []);

  return (
    <div className="w-full h-full">
      <section data-aos="fade-up" className="w-full h-full pt-20">
        <div className="container grid items-center justify-center w-full h-full grid-cols-1 gap-10 px-5 py-20 mx-auto md:h-screen md:grid-cols-2 md:px-0">
          <div className="order-1 md:order-2 w-full h-[400px] rounded-3xl">
            <img
              src={building1}
              alt="banner"
              className="object-cover w-full h-full rounded-2xl"
            />
          </div>
          <div className="flex flex-col items-start justify-center order-2 w-full h-full p-4 md:order-1 sm:p-6 md:p-8 rounded-3xl">
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-primary-500">
              Qallera Technology Eranusa
            </h1>
            <p className="mt-4 text-base sm:text-lg lg:text-xl">
              Qallera Technology Eranusa berdiri pada tahun 2024, berfokus
              pada perkembangan solusi digital untuk mendukung transformasi
              bisnis di Indonesia.
            </p>
            <button className="px-4 py-2 mt-6 text-white transition-all duration-300 ease-in-out transform rounded-full shadow-lg bg-gradient-to-r from-primary-500 to-blue-400 hover:from-primary-600 hover:to-blue-500 hover:shadow-xl hover:-translate-y-1">
              Explore More
            </button>
          </div>
        </div>
      </section>
      <section className="w-full h-full bg-primary-500">
        <div className="container grid items-center justify-center w-full h-full grid-cols-1 gap-10 px-5 py-20 mx-auto md:grid-cols-2 md:px-0">
          <div data-aos="fade-right" className="w-full h-[400px]">
            <img
              src={discus}
              alt="discus"
              className="object-cover w-full h-full rounded-3xl"
            />
          </div>
          <div
            data-aos="fade-left"
            className="flex flex-col items-start justify-center w-full h-full p-4 text-white sm:p-6 md:p-8 rounded-3xl"
          >
            <h2 className="text-2x md:text-3xl">About Us</h2>
            <h1 className="mt-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
              Qallera Technology Eranusa
            </h1>
            <p className="mt-4 text-base sm:text-lg lg:text-xl">
              Qallera Technology Eranusa adalah perusahaan e-commerce dan
              marketplace berbasis PPOB (Payment Point Online Bank) yang dapat
              mempermudah masyarakat dalam melakukan berbagai transaksi
              keuangan.
            </p>
            <button className="px-4 py-2 mt-6 text-white transition-all duration-300 ease-in-out transform rounded-full shadow-lg bg-gradient-to-r from-primary-500 to-blue-400 hover:from-primary-600 hover:to-blue-500 hover:shadow-xl hover:-translate-y-1">
              Explore More
            </button>
            <div className="flex flex-row w-full h-full gap-5 mt-4">
              <div className="w-full h-full">
                <p className="text-3xl font-bold">1</p>
                <p className="mt-2">Years of Experience</p>
              </div>
              <div className="w-full h-full">
                <p className="text-3xl font-bold">1</p>
                <p className="mt-2">Completed Project</p>
              </div>
              <div className="w-full h-full">
                <p className="text-3xl font-bold">3</p>
                <p className="mt-2">Company Office</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-full">
        <div className="container flex-col w-full h-full px-5 py-20 mx-auto mx-a rounded-3xl md:px-0">
          <div data-aos="fade-up">
            <h2 className="text-2x md:text-3xl">Our services</h2>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl lg:text-5xl text-primary-500">
              What we do?
            </h1>
          </div>
          <div className="flex-row hidden gap-5 mt-10 md:flex">
            <div data-aos="zoom-in" className="p-2">
              <div
                className="relative flex flex-col justify-end w-full gap-4 p-5 overflow-hidden bg-red-500 rounded-lg h-80 group"
                style={{
                  backgroundImage: `url(${mobileapp})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 transition-opacity duration-300 bg-blue-500 opacity-0 group-hover:opacity-50"></div>
                <p className="relative text-3xl font-semibold transition-colors duration-300 text-primary-500 group-hover:text-white">
                  Mobile Application
                </p>
                <p className="relative text-base text-transparent transition-all duration-300 group-hover:text-white group-hover:mt-2">
                  Develop mobile applications that meet modern business needs.
                </p>
                <RiArrowRightLine className="relative text-2xl transition-colors duration-300 text-primary-500 group-hover:text-white" />
              </div>
            </div>
            <div data-aos="zoom-in" className="p-2">
              <div
                className="relative flex flex-col justify-end w-full gap-4 p-5 overflow-hidden bg-red-500 rounded-lg h-80 group"
                style={{
                  backgroundImage: `url(${webapp})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 transition-opacity duration-300 bg-blue-500 opacity-0 group-hover:opacity-50"></div>
                <p className="relative text-3xl font-semibold transition-colors duration-300 text-primary-500 group-hover:text-white">
                  Web Application
                </p>
                <p className="relative text-base text-transparent transition-all duration-300 group-hover:text-white group-hover:mt-2">
                  Build responsive and dynamic web applications.
                </p>
                <RiArrowRightLine className="relative text-2xl transition-colors duration-300 text-primary-500 group-hover:text-white" />
              </div>
            </div>
            <div data-aos="zoom-in" className="p-2">
              <div
                className="relative flex flex-col justify-end w-full gap-4 p-5 overflow-hidden bg-red-500 rounded-lg h-80 group"
                style={{
                  backgroundImage: `url(${uiuxdesign})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 transition-opacity duration-300 bg-blue-500 opacity-0 group-hover:opacity-50"></div>
                <p className="relative text-3xl font-semibold transition-colors duration-300 text-primary-500 group-hover:text-white">
                  UI / UX Design
                </p>
                <p className="relative text-base text-transparent transition-all duration-300 group-hover:text-white group-hover:mt-2">
                  Craft intuitive and engaging user experiences.
                </p>
                <RiArrowRightLine className="relative text-2xl transition-colors duration-300 text-primary-500 group-hover:text-white" />
              </div>
            </div>
            <div data-aos="zoom-in" className="p-2">
              <div
                className="relative flex flex-col justify-end w-full gap-4 p-5 overflow-hidden bg-red-500 rounded-lg h-80 group"
                style={{
                  backgroundImage: `url(${digitalmarketing})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 transition-opacity duration-300 bg-blue-500 opacity-0 group-hover:opacity-50"></div>
                <p className="relative text-3xl font-semibold transition-colors duration-300 text-primary-500 group-hover:text-white">
                  Digital Marketing
                </p>
                <p className="relative text-base text-transparent transition-all duration-300 group-hover:text-white group-hover:mt-2">
                  Enhance your brand`s presence online.
                </p>
                <RiArrowRightLine className="relative text-2xl transition-colors duration-300 text-primary-500 group-hover:text-white" />
              </div>
            </div>
          </div>

          {/* services slider */}
          <Slider {...settings} className="mt-10 md:hidden">
            <div className="p-2">
              <div
                className="relative flex flex-col justify-end w-full gap-4 p-5 overflow-hidden bg-red-500 rounded-lg h-80 group"
                style={{
                  backgroundImage: `url(${mobileapp})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 transition-opacity duration-300 bg-blue-500 opacity-0 group-hover:opacity-50"></div>
                <p className="relative text-3xl font-semibold transition-colors duration-300 text-primary-500 group-hover:text-white">
                  Mobile Application
                </p>
                <p className="relative text-base text-transparent transition-all duration-300 group-hover:text-white group-hover:mt-2">
                  Develop mobile applications that meet modern business needs.
                </p>
                <RiArrowRightLine className="relative text-2xl transition-colors duration-300 text-primary-500 group-hover:text-white" />
              </div>
            </div>
            <div className="p-2">
              <div
                className="relative flex flex-col justify-end w-full gap-4 p-5 overflow-hidden bg-red-500 rounded-lg h-80 group"
                style={{
                  backgroundImage: `url(${webapp})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 transition-opacity duration-300 bg-blue-500 opacity-0 group-hover:opacity-50"></div>
                <p className="relative text-3xl font-semibold transition-colors duration-300 text-primary-500 group-hover:text-white">
                  Web Application
                </p>
                <p className="relative text-base text-transparent transition-all duration-300 group-hover:text-white group-hover:mt-2">
                  Build responsive and dynamic web applications.
                </p>
                <RiArrowRightLine className="relative text-2xl transition-colors duration-300 text-primary-500 group-hover:text-white" />
              </div>
            </div>
            <div className="p-2">
              <div
                className="relative flex flex-col justify-end w-full gap-4 p-5 overflow-hidden bg-red-500 rounded-lg h-80 group"
                style={{
                  backgroundImage: `url(${uiuxdesign})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 transition-opacity duration-300 bg-blue-500 opacity-0 group-hover:opacity-50"></div>
                <p className="relative text-3xl font-semibold transition-colors duration-300 text-primary-500 group-hover:text-white">
                  UI / UX Design
                </p>
                <p className="relative text-base text-transparent transition-all duration-300 group-hover:text-white group-hover:mt-2">
                  Craft intuitive and engaging user experiences.
                </p>
                <RiArrowRightLine className="relative text-2xl transition-colors duration-300 text-primary-500 group-hover:text-white" />
              </div>
            </div>
            <div className="p-2">
              <div
                className="relative flex flex-col justify-end w-full gap-4 p-5 overflow-hidden bg-red-500 rounded-lg h-80 group"
                style={{
                  backgroundImage: `url(${digitalmarketing})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 transition-opacity duration-300 bg-blue-500 opacity-0 group-hover:opacity-50"></div>
                <p className="relative text-3xl font-semibold transition-colors duration-300 text-primary-500 group-hover:text-white">
                  Digital Marketing
                </p>
                <p className="relative text-base text-transparent transition-all duration-300 group-hover:text-white group-hover:mt-2">
                  Enhance your brand`s presence online.
                </p>
                <RiArrowRightLine className="relative text-2xl transition-colors duration-300 text-primary-500 group-hover:text-white" />
              </div>
            </div>
          </Slider>
        </div>
      </section>
      <section className="w-full h-full bg-primary-500">
        <div data-aos="fade-up" className="container flex flex-col w-full h-full p-4 py-20 mx-auto text-white sm:p-6 md:p-8 rounded-3xl">
          <h2 className="text-2x md:text-3xl">They trust us</h2>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Our Clients
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-5 px-2.5 mt-10">
            <div className="w-full h-24 p-5 bg-white rounded-3xl group">
              <img
                src={amazon}
                alt="Amazon"
                className="object-contain w-full h-full transition-all duration-300 filter grayscale group-hover:filter-none"
              />
            </div>
            <div className="w-full h-24 p-5 bg-white rounded-3xl group">
              <img
                src={ipaymu}
                alt="Amazon"
                className="object-contain w-full h-full transition-all duration-300 filter grayscale group-hover:filter-none"
              />
            </div>
            <div className="w-full h-24 p-5 bg-white rounded-3xl group">
              <img
                src={amazon}
                alt="Amazon"
                className="object-contain w-full h-full transition-all duration-300 filter grayscale group-hover:filter-none"
              />
            </div>
            <div className="w-full h-24 p-5 bg-white rounded-3xl group">
              <img
                src={ipaymu}
                alt="Amazon"
                className="object-contain w-full h-full transition-all duration-300 filter grayscale group-hover:filter-none"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-full px-5 py-10 bg-white md:px-0">
        <div className="container flex flex-col mx-auto">
          <div data-aos="fade-up" className="flex flex-col w-full h-full mb-10">
            <h1 className="text-3xl font-extrabold md:text-5xl text-primary-500">
              What Our Clients Say
            </h1>
            <h2 className="text-2xl text-gray-500 md:text-3xl">Testimonials</h2>
          </div>

          <div data-aos="zoom-in" className="container w-full h-full mx-auto">
            <Slider {...settings}>
              <div className="h-full p-5">
                <div className="relative h-full p-6 transition-transform duration-300 transform rounded-lg shadow-lg bg-primary-500 hover:shadow-xl hover:scale-105">
                  <FaQuoteLeft className="absolute text-4xl text-white opacity-70 top-4 left-4" />
                  <FaQuoteRight className="absolute text-4xl text-white opacity-70 bottom-4 right-4" />
                  <div className="flex items-center mt-10">
                    {Array.from({ length: 5 }, (_, i) => (
                      <AiFillStar key={i} className="text-yellow-500" />
                    ))}
                  </div>
                  <p className="mt-6 text-lg italic text-white">
                    This company provides the best service ever. Highly
                    recommend!
                  </p>
                  <div className="flex items-center mt-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full"></div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-white">John Doe</h3>
                      <p className="text-sm text-gray-200">CEO, Company A</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full p-5">
                <div className="relative h-full p-6 transition-transform duration-300 transform rounded-lg shadow-lg bg-primary-500 hover:shadow-xl hover:scale-105">
                  <FaQuoteLeft className="absolute text-4xl text-white opacity-70 top-4 left-4" />
                  <FaQuoteRight className="absolute text-4xl text-white opacity-70 bottom-4 right-4" />
                  <div className="flex items-center mt-10">
                    {Array.from({ length: 5 }, (_, i) => (
                      <AiFillStar key={i} className="text-yellow-500" />
                    ))}
                  </div>
                  <p className="mt-6 text-lg italic text-white">
                    Amazing experience working with this team. Truly
                    professional and reliable.
                  </p>
                  <div className="flex items-center mt-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full"></div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-white">
                        Jane Smith
                      </h3>
                      <p className="text-sm text-gray-200">
                        Marketing Head, Company B
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full p-5">
                <div className="relative h-full p-6 transition-transform duration-300 transform rounded-lg shadow-lg bg-primary-500 hover:shadow-xl hover:scale-105">
                  <FaQuoteLeft className="absolute text-4xl text-white opacity-70 top-4 left-4" />
                  <FaQuoteRight className="absolute text-4xl text-white opacity-70 bottom-4 right-4" />
                  <div className="flex items-center mt-10">
                    {Array.from({ length: 5 }, (_, i) => (
                      <AiFillStar key={i} className="text-yellow-500" />
                    ))}
                  </div>
                  <p className="mt-6 text-lg italic text-white">
                    Exceptional service and support. Will definitely work with
                    them again.
                  </p>
                  <div className="flex items-center mt-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full"></div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-white">
                        Alex Brown
                      </h3>
                      <p className="text-sm text-gray-200">CTO, Company C</p>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
