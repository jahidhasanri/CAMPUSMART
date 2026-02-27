import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import Banner from "../../components/Shared/Banner";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const ContactUs = () => {
  const formRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_USER_REPLY_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      alert("Success! Your message and a confirmation email have been sent.");
      reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send message. Please check your network or credentials.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
    
      <div className="bg-[#3b5d50]">
        <Banner
          title="CONTACT US"
          subtitle="Have questions? We are here to help you with your campus lifestyle, from housing to marketplace essentials."
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side: Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Get Info</h3>
            
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 hover:shadow-lg transition">
              <div className="bg-[#3b5d50] p-3 rounded-lg text-white">
                <FaPhoneAlt />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Call Us</p>
                <p className="font-semibold text-gray-800">+880 1234-567890</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 hover:shadow-lg transition">
              <div className="bg-[#3b5d50] p-3 rounded-lg text-white">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Email</p>
                <p className="font-semibold text-gray-800">support@campusmart.com</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 hover:shadow-lg transition">
              <div className="bg-[#3b5d50] p-3 rounded-lg text-white">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Address</p>
                <p className="font-semibold text-gray-800">Student Hub, Level 2</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 hover:shadow-lg transition">
              <div className="bg-[#3b5d50] p-3 rounded-lg text-white">
                <FaClock />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Working Hours</p>
                <p className="font-semibold text-gray-800">10 AM - 6 PM (Sun-Thu)</p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
            
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Name</label>
                  <input

                    {...register("from_name", { required: "Name is required" })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3b5d50] outline-none transition"
                    placeholder="Enter name"
                  />
                  {errors.from_name && <span className="text-red-500 text-xs">{errors.from_name.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Email</label>
                  <input
                    {...register("user_email", { required: "Email is required" })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3b5d50] outline-none transition"
                    placeholder="varsity-email@edu.com"
                  />
                  {errors.user_email && <span className="text-red-500 text-xs">{errors.user_email.message}</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Subject</label>
                <select
                  {...register("title")}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3b5d50] outline-none bg-white"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Stripe Payment">Payment Issue</option>
                  <option value="Room/Housing">Room Renting</option>
                  <option value="Marketplace">Product Issue</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Message</label>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  rows="5"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3b5d50] outline-none transition"
                  placeholder="How can we help you today?"
                ></textarea>
                {errors.message && <span className="text-red-500 text-xs">{errors.message.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#3b5d50] hover:bg-[#2d4a40] text-white font-bold py-4 rounded-xl transition duration-300 disabled:bg-gray-400 shadow-lg transform active:scale-95"
              >
                {isSubmitting ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;