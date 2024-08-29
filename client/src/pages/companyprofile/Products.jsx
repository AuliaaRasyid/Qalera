import app1 from "../../assets/app1.jpg";
import app2 from "../../assets/app2.jpg";

const productsData = [
  {
    id: 0,
    image: app1,
    title: "Qlick",
    description:
      "Qlick adalah aplikasi canggih yang menggabungkan fungsi dompet digital dan e-commerce. Dengan Qlick, Anda dapat dengan mudah melakukan pembayaran online, transfer uang, dan belanja kebutuhan sehari-hari dalam satu platform yang terintegrasi.",
  },
  {
    id: 1,
    image: app2,
    title: "Product 2",
    description: "This is the description for product 2.",
  },
  {
    id: 2,
    image: null,
    title: "Coming Soon",
    description: "Description will be available soon.",
  },
  {
    id: 3,
    image: null,
    title: "Coming Soon",
    description: "Description will be available soon.",
  },
];

const Products = () => {

  return (
    <div className="w-full h-full bg-gray-100">
      <section className="container w-full h-full px-5 py-20 pt-20 mx-auto md:px-0">
        <div className="w-full h-full py-10">
          <h2 className="text-2xl">Products</h2>
          <h1 className="text-4xl font-bold text-primary-500">
            Discover our latest projects
          </h1>
        </div>
        <div className="flex flex-col w-full h-full gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
          {productsData.map((product) => (
            <div
              key={product.id}
              className="relative w-full p-5 transition duration-500 transform bg-white shadow-lg h-96 rounded-2xl hover:scale-105 hover:shadow-2xl"
            >
              <div className="w-full h-48 mb-5 overflow-hidden rounded-xl">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-300">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
              </div>
              <h1 className="text-xl font-bold text-gray-800">{product.title}</h1>
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                {product.description}
              </p>
              <div className="absolute bottom-5 right-5">
                <button className="px-4 py-2 text-sm font-semibold text-white rounded-full shadow bg-primary-500 hover:bg-primary-600">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Products;
