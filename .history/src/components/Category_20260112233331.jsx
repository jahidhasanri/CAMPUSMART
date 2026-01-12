
// import { motion } from "framer-motion";
import { FaHome, FaBook, FaShoppingBag } from "react-icons/fa";

const categories = [
  {
    title: "Rooms & Seats",
    desc: "Find or rent rooms and seats near your campus easily.",
    icon: <FaHome />,
  },
  {
    title: "Old Books",
    desc: "Buy and sell previous semester books at affordable prices.",
    icon: <FaBook />,
  },
  {
    title: "Accessories",
    desc: "Daily student essentials like bags, calculators, gadgets & more.",
    icon: <FaShoppingBag />,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const Categories = () => {
  return (
    <section className="py-20 bg-[#f5f7f6]">
      <div className="max-w-[1300px] mx-auto px-6">

        {/* TITLE */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Explore categories specially designed for university students.
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl text-[#3b5d50] mb-6">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Categories;
