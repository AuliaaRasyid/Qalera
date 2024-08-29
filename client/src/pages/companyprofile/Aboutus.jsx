import teamwork from "../../assets/teamwork.avif";
import vision from "../../assets/vision.jpg";
import mision from "../../assets/mision.jpg";
import discus from "../../assets/discus.avif";

const Aboutus = () => {
  return (
    <div className="relative w-full h-full">
      <section
        className="flex flex-col items-center justify-center w-full h-full pt-20 bg-no-repeat bg-cover md:h-screen"
        style={{
          backgroundImage: `url(${teamwork})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay with blue tint */}
        <div className="absolute top-20 md:top-0 inset-0 bg-blue-900 h-[360px] md:h-screen opacity-70"></div>

        <div className="container relative z-10 flex flex-col items-center justify-center px-5 py-20 mx-auto md:px-0">
          <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-lg md:text-5xl lg:text-6xl">
            Qallera Technology Eranusa
          </h1>
          <div className="w-full md:w-2/3">
            <p className="text-base text-center text-white md:w-full md:text-lg">
              Qallera Technology Eranusa berdiri pada tahun 2024, berfokus
              pada perkembangan solusi digital untuk mendukung transformasi
              bisnis di Indonesia.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full h-full">
        <div className="container grid items-center justify-center w-full h-full grid-cols-1 gap-10 px-5 py-20 mx-auto md:grid-cols-2 md:px-0">
          <div className="w-full h-[400px]">
            <img
              src={discus}
              alt="discus"
              className="object-cover w-full h-full rounded-3xl"
            />
          </div>
          <div className="flex flex-col items-start justify-center w-full h-full p-4 sm:p-6 md:p-8 rounded-3xl">
            <h2 className="text-2x md:text-3xl">About Us</h2>
            <h1 className="mt-6 text-3xl font-bold sm:text-4xl lg:text-5xl text-primary-500">
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
      <section className="w-full h-full bg-primary-500">
        <div className="container grid items-center justify-center w-full h-full grid-cols-1 gap-10 px-5 py-20 mx-auto md:grid-cols-3 md:px-0">
          {/* Concept 1: Fast */}
          <div className="flex flex-col items-center justify-center w-full h-full p-6 bg-white shadow-lg rounded-3xl">
            <div className="flex items-center justify-center w-16 h-16 mb-4 bg-blue-500 rounded-full">
              <i className="text-3xl font-bold text-white">⚡</i>
            </div>
            <h2 className="text-2xl font-bold text-center text-primary-500">
              Fast
            </h2>
            <p className="mt-4 text-center text-gray-600">
              Kami bergerak cepat dalam memberikan solusi terbaik untuk memenuhi
              kebutuhan bisnis Anda.
            </p>
          </div>

          {/* Concept 2: Innovative */}
          <div className="flex flex-col items-center justify-center w-full h-full p-6 bg-white shadow-lg rounded-3xl">
            <div className="flex items-center justify-center w-16 h-16 mb-4 bg-green-500 rounded-full">
              <i className="text-3xl font-bold text-white">💡</i>
            </div>
            <h2 className="text-2xl font-bold text-center text-primary-500">
              Innovative
            </h2>
            <p className="mt-4 text-center text-gray-600">
              Inovasi adalah inti dari setiap solusi yang kami tawarkan,
              membantu Anda unggul dalam persaingan.
            </p>
          </div>

          {/* Concept 3: Reliable */}
          <div className="flex flex-col items-center justify-center w-full h-full p-6 bg-white shadow-lg rounded-3xl">
            <div className="flex items-center justify-center w-16 h-16 mb-4 bg-red-500 rounded-full">
              <i className="text-3xl font-bold text-white">✔️</i>
            </div>
            <h2 className="text-2xl font-bold text-center text-primary-500">
              Reliable
            </h2>
            <p className="mt-4 text-center text-gray-600">
              Kehandalan adalah janji kami. Kami memastikan setiap layanan yang
              kami berikan dapat diandalkan setiap saat.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full h-full">
        <div className="container grid items-center justify-center w-full h-full grid-cols-1 gap-10 px-5 py-20 mx-auto md:grid-cols-2 md:px-0">
          <div className="w-full h-[400px]">
            <img
              src={vision}
              alt="vision"
              className="object-cover w-full h-full shadow-lg rounded-3xl"
            />
          </div>
          <div className="flex flex-col items-start justify-center w-full h-full p-4 sm:p-6 md:p-8">
            <h1 className="mt-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
              Vision
            </h1>
            <p className="mt-4 text-base sm:text-lg lg:text-xl">
              Menjadi Perusahaan E-commerce & Marketplace Terkemuka di Indonesia
              yang Berkelas Dunia
            </p>
          </div>
        </div>
      </section>

      {/* Section Mision */}
      <section className="w-full h-full">
        <div className="container grid items-center justify-center w-full h-full grid-cols-1 gap-10 px-5 pb-20 mx-auto md:grid-cols-2 md:px-0">
          <div className="flex flex-col items-start justify-center w-full h-full p-4 sm:p-6 md:p-8">
            <h1 className="mt-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
              Mision
            </h1>
            <p className="mt-4 text-base sm:text-lg lg:text-xl">
              Memberikan solusi digital terbaik untuk transformasi bisnis di
              Indonesia, dengan layanan yang berorientasi pada kualitas,
              kecepatan, dan inovasi.
            </p>
          </div>
          <div className="w-full h-[400px]">
            <img
              src={mision}
              alt="mision"
              className="object-cover w-full h-full shadow-lg rounded-3xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;
