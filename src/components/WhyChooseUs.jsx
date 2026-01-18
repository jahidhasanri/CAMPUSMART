import { FaClock, FaUserShield, FaSmile, FaGraduationCap, FaMoneyBillWave, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaMoneyBillWave />,
    title: "Student Friendly Prices",
    desc: "Buy and sell products at affordable prices within your campus community."
  },
  {
    icon: <FaClock />,
    title: "Time Saving",
    desc: "Find nearby deals quickly without long searching or middlemen."
  },
  {
    icon: <FaGraduationCap />,
    title: "Verified Students",
    desc: "Only university students can post and interact on CampusMart."
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Deals",
    desc: "Safe communication and trusted student-to-student transactions."
  },
  {
    icon: <FaUserShield />,
    title: "Reliable Platform",
    desc: "Moderated listings to ensure quality and reliability."
  },
  {
    icon: <FaSmile />,
    title: "User Satisfaction",
    desc: "Built by students, for students — your satisfaction matters."
  },
];

// 🔥 Animation Variant
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
};

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-gray-800 mb-14"
        >
          Why Choose <span className="text-[#3b5d50]">CampusMart</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

          {/* Left Features */}
          <div className="space-y-8">
            {features.slice(0, 3).map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex items-start gap-4"
              >
                <div className="text-[#3b5d50] text-3xl">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <img
              src="/images/whyChooseUs.jpg"
              alt="CampusMart Student"
              className="w-72 h-72 object-cover rounded-full shadow-lg"
            />
          </motion.div>

          {/* Right Features */}
          <div className="space-y-8">
            {features.slice(3).map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex items-start gap-4"
              >
                <div className="text-[#3b5d50] text-3xl">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
