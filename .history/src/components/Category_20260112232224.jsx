import { motion } from "framer-motion";
import { FaHome, FaBook, FaShoppingBag } from "react-icons/fa";

const categories = [
  {
    id: 1,
    title: "Rooms & Seats",
    desc: "Find or rent rooms and seats near your campus easily.",
    icon: <FaHome />,
  },
  {
    id: 2,
    title: "Old Books",
    desc: "Buy and sell previous semester books at affordable prices.",
    icon: <FaBook />,
  },
  {
    id: 3,
    title: "Accessories",
    desc: "Daily student essentials like bags, calculators, gadgets & more.",
    icon: <FaShoppingBag />,
  },
];

const Categories = () => {
  return (
    <section className="py-20 bg-[#f5f7f6]">
      <div className="max-w-[1300px] mx-auto px-6">
        
        {/* SECTION TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Browse by Category
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Explore different categories designed specially for university students.
          </p>
        </motion.div>

        {/* CATEGORY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="text-4xl text-[#3b5d50] mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm mb-6">
                {item.desc}
              </p>

              <button className="text-[#3b5d50] font-medium hover:underline">
                Explore →
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Categories;
