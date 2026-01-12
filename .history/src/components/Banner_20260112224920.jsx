import { useState, useEffect } from "react";

const slides = [
  {
    title: "Find Rooms & Seats Inside Your Campus",
    subtitle:
      "Easily find or post available rooms and seats within your university area with admin approval.",
    image: "/images/room1.png",
  },
  {
    title: "Buy & Sell Previous Semester Books",
    subtitle:
      "Save money by buying used books or sell your old semester books to juniors.",
    image: "/images/books.png",
  },
  {
    title: "Student Accessories Marketplace",
    subtitle:
      "Calculator, table lamp, chair, bag and other student essentials             — all in one place.",
    image: "/images/product-3.png",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#3b5d50]">
      <div className="max-w-[1300px] mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          
          {/* LEFT CONTENT */}
          <div className="text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {slides[current].title}
            </h1>

            <p className="text-gray-200 text-lg mb-8">
              {slides[current].subtitle}
            </p>

            <div className="flex gap-4 flex-wrap">
              <button className="bg-white text-[#3b5d50] px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                Browse Items
              </button>
              <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#3b5d50] transition">
                Post an Item
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center">
            <img
              src={slides[current].image}
              alt="banner"
              className="w-full max-h-[350px] max-w-[550px] object-contain"
            />
          </div>
        </div>

        {/* DOTS */}
        <div className="flex justify-center mt-10 gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full ${
                current === index ? "bg-white" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
