import React from 'react';
import Banner from '../../components/Shared/Banner';
import { FaHome, FaShoppingBag, FaLaptop, FaBook, FaTshirt, FaBasketballBall, FaHeartbeat, FaHeadphones, FaCalendarAlt } from "react-icons/fa";

const categories = [
  { value: "housing", label: "Housing", icon: <FaHome /> },
  { value: "marketplace", label: "Marketplace", icon: <FaShoppingBag /> },
  { value: "electronics", label: "Electronics / Gadgets", icon: <FaLaptop /> },
  { value: "stationery", label: "Stationery / Books", icon: <FaBook /> },
  { value: "apparel", label: "Apparel / Campus Wear", icon: <FaTshirt /> },
  { value: "sports", label: "Sports / Fitness", icon: <FaBasketballBall /> },
  { value: "personal_care", label: "Personal Care / Health", icon: <FaHeartbeat /> },
  { value: "accessories", label: "Electronics Accessories", icon: <FaHeadphones /> },
  { value: "events", label: "Events / Campus Life", icon: <FaCalendarAlt /> },
];



const Services = () => {
    return (
        <div>
            <div className="bg-[#3b5d50]">
            <Banner
                title="OUR SERVICES"
                subtitle="Your trusted campus marketplace where students can easily find books, stationery, electronics, and daily essentials — all in one place with fast delivery and secure payment."
            />
            </div>

        <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Explore Our Campus Categories
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover a wide range of services and products designed to make your campus life easier, smarter, and more convenient.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
            >
              <div className="text-3xl text-[#3b5d50] mb-4 flex justify-center">
                {cat.icon}
              </div>
              <h3 className="font-semibold text-lg">{cat.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>

<section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Reliable Order & Customer Support Services
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          We ensure a smooth ordering process and dedicated support to make your shopping experience safe and stress-free.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">🚚 Fast & Secure Delivery</h3>
            <p className="text-gray-600">Quick campus delivery with secure handling.</p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">🔄 Easy Return & Refund</h3>
            <p className="text-gray-600">Hassle-free return policy with fast refunds.</p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">💬 24/7 Customer Support</h3>
            <p className="text-gray-600">Dedicated support team for all your issues.</p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">📦 Order Tracking</h3>
            <p className="text-gray-600">Track your orders easily anytime.</p>
          </div>
        </div>
      </div>
    </section>


        </div>
    );
};

export default Services;