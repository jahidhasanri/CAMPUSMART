import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserPlus, FaUpload, FaCheckCircle, FaHandshake, FaSearch, FaInfoCircle, FaPhone, FaShoppingCart } from "react-icons/fa";

const sellerSteps = [
  { id: 1, icon: <FaUserPlus />, title: "Register / Login", desc: "Create your student account to start selling rooms, books, or accessories." },
  { id: 2, icon: <FaUpload />, title: "Post Your Item", desc: "Add rooms, books, seats, or accessories for sale, submit for admin approval." },
  { id: 3, icon: <FaCheckCircle />, title: "Admin Approval", desc: "Admin reviews and approves your post before it goes live." },
  { id: 4, icon: <FaHandshake />, title: "Connect & Deal", desc: "Once approved, buyers can contact you to complete the transaction safely." },
];

const buyerSteps = [
  { id: 1, icon: <FaSearch />, title: "Browse Items", desc: "Explore available rooms, books, and accessories inside your campus." },
  { id: 2, icon: <FaInfoCircle />, title: "Check Details", desc: "See post info, price, location, and ensure it is admin approved." },
  { id: 3, icon: <FaPhone />, title: "Connect With Seller", desc: "Contact the seller safely to negotiate or ask questions." },
  { id: 4, icon: <FaShoppingCart />, title: "Buy / Rent", desc: "Complete the transaction and enjoy your new item." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("seller");

  const steps = activeTab === "seller" ? sellerSteps : buyerSteps;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1300px] mx-auto px-6">

        {/* SECTION TITLE + TAB */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How CampusMart Works
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Simple steps for both sellers and buyers inside your university community.
          </p>

          {/* Tabs */}
          <div className="flex justify-center gap-6 mt-6">
            <button
              className={`px-5 py-2 rounded-full font-semibold ${activeTab === "seller" ? "bg-[#3b5d50] text-white" : "bg-gray-200 text-gray-800"}`}
              onClick={() => setActiveTab("seller")}
            >
              Seller
            </button>
            <button
              className={`px-5 py-2 rounded-full font-semibold ${activeTab === "buyer" ? "bg-[#3b5d50] text-white" : "bg-gray-200 text-gray-800"}`}
              onClick={() => setActiveTab("buyer")}
            >
              Buyer
            </button>
          </div>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <AnimatePresence mode="wait">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                exit={{ opacity: 0, y: 40, transition: { duration: 0.3 } }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-[#f5f7f6] p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="text-5xl text-[#3b5d50] mb-6">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
