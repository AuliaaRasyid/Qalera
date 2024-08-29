const Contact = () => {
  return (
    <div className="flex flex-row items-center justify-center w-full min-h-screen pt-20">
      <div className="container flex flex-col items-start justify-between gap-10 p-10 mx-auto md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="mb-8">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1392065959108!2d106.91677171174732!3d-6.245379261129493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699a5ee457eee7%3A0x769d4bd70f48cf65!2sLegalyn%20Indonesia%20-%20Virtual%20Office%20Jakarta%20Timur%20-%20Jasa%20Legalitas%20Resmi!5e0!3m2!1sid!2sid!4v1724464913207!5m2!1sid!2sid"
              className="w-full shadow-lg h-80 rounded-xl"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Bandung</h3>
              <p>
                Legalyn Indonesia - Virtual Office Jakarta Timur - Jasa
                Legalitas Resmi
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Jakarta</h3>
              <p>
                Legalyn Indonesia - Virtual Office Jakarta Timur - Jasa
                Legalitas Resmi
              </p>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-lg">Contact us:</p>
            <p className="text-2xl font-bold">+62 822 1234 5678</p>
            <p className="text-2xl font-bold">qalleraeranusa@gmail.com</p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-500">
                In
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500">
                Me
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500">
                Ig
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500">
                Tk
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full h-full px-10 md:w-1/2 md:mt-0">
          <h2 className="mb-6 text-3xl font-bold">Have Something in Mind?</h2>
          <form className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 text-gray-900 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 text-gray-900 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Your Message
              </label>
              <textarea
                id="message"
                className="w-full px-4 py-2 text-gray-900 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your message"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white transition-all duration-300 ease-in-out transform rounded-full shadow-lg bg-gradient-to-r from-primary-500 to-blue-400 hover:from-primary-600 hover:to-blue-500 hover:shadow-xl hover:-translate-y-1"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
