import React from 'react';
import Banner from '../../components/Shared/Banner';
import {
  FaHome,
  FaShoppingBag,
  FaLaptop,
  FaBook,
  FaTshirt,
  FaBasketballBall,
  FaHeartbeat,
  FaHeadphones,
  FaCalendarAlt,
  FaTruck,
  FaUndo,
  FaHeadset,
  FaBoxOpen,
} from "react-icons/fa";
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

    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Campus Services Designed for Smart Student Life
          </h1>
          <p className="max-w-3xl mx-auto text-lg mb-8">
            Your trusted campus marketplace where students can easily find everything
            they need — from academic supplies to daily essentials — with fast delivery and secure payment.
          </p>
          <div className="space-x-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold shadow hover:shadow-lg">
              Explore Services
            </button>
            <button className="bg-indigo-800 px-6 py-3 rounded-xl font-semibold shadow hover:shadow-lg">
              Start Shopping
            </button>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES SECTION ================= */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Our Campus Categories</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover a wide range of services and products designed to make your campus life easier and smarter.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
              >
                <div className="text-3xl text-blue-600 mb-4 flex justify-center">
                  {cat.icon}
                </div>
                <h3 className="font-semibold">{cat.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ORDER & SUPPORT SECTION ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Reliable Order & Customer Support Services
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            We ensure a smooth ordering process and dedicated support for a stress-free experience.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-6 rounded-2xl shadow-md hover:shadow-xl transition">
              <FaTruck className="text-blue-600 text-2xl mb-4" />
              <h3 className="font-semibold mb-2">Fast & Secure Delivery</h3>
              <p className="text-gray-600">
                Quick campus delivery with safe product handling.
              </p>
            </div>

            <div className="p-6 rounded-2xl shadow-md hover:shadow-xl transition">
              <FaUndo className="text-blue-600 text-2xl mb-4" />
              <h3 className="font-semibold mb-2">Easy Return & Refund</h3>
              <p className="text-gray-600">
                Hassle-free returns and quick refund processing.
              </p>
            </div>

            <div className="p-6 rounded-2xl shadow-md hover:shadow-xl transition">
              <FaHeadset className="text-blue-600 text-2xl mb-4" />
              <h3 className="font-semibold mb-2">24/7 Customer Support</h3>
              <p className="text-gray-600">
                Dedicated support team ready to help anytime.
              </p>
            </div>

            <div className="p-6 rounded-2xl shadow-md hover:shadow-xl transition">
              <FaBoxOpen className="text-blue-600 text-2xl mb-4" />
              <h3 className="font-semibold mb-2">Order Tracking System</h3>
              <p className="text-gray-600">
                Track your order status easily from dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS SECTION ================= */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">How Campus Mart Works</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Follow these simple steps to enjoy smooth campus shopping.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              "Create Account",
              "Browse Categories",
              "Add to Cart & Checkout",
              "Receive Your Order",
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-md">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-blue-600 text-white rounded-full text-lg font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Why Students Trust Campus Mart</h2>
          <ul className="space-y-3 text-gray-600">
            <li>✔ Student-Friendly Pricing</li>
            <li>✔ Fast Campus Delivery</li>
            <li>✔ Secure Payment System</li>
            <li>✔ Trusted Campus Community</li>
            <li>✔ Easy-to-Use Platform</li>
          </ul>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Simplify Your Campus Shopping?
        </h2>
        <p className="mb-8">
          Join thousands of students who trust Campus Mart for daily campus needs.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-semibold shadow hover:shadow-lg">
          Start Shopping Now
        </button>
      </section>

        </div>
    );
};

export default Services;