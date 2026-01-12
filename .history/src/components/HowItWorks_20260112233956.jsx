/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaUserPlus, FaUpload, FaCheckCircle, FaHandshake } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaUserPlus />,
    title: "Register / Login",
    desc: "Create your student account to start buying or selling items within your campus community.",
  },
  {
    id: 2,
    icon: <FaUpload />,
    title: "Post Your Item",
    desc: "Add rooms, books, seats, or accessories you want to sell and submit for admin approval.",
  },
  {
    id: 3,
    icon: <FaCheckCircle />,
    title: "Admin Approval",
    desc: "Our admin team reviews and approves your post before it goes live to maintain trust and safety.",
  },
  {
    id: 4,
    icon: <FaHandshake />,
    title: "Connect & Deal",
    desc: "Once approved, interested students can connect with you and complete the transaction safely.",
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

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1300px] mx-auto px-6">

        {/* Section Title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How CampusMart Works
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            A simple 4-step process for buying and selling inside your university community.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-[#f5f7f6] p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <div className="text-5xl text-[#3b5d50] mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
