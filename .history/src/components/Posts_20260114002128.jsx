/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const posts = [
  {
    id: 1,
    img: "https://i.ibb.co/3FZ4z4F/book.jpg",
    title: "Data Structure Book",
    category: "Book",
    location: "BUBT Campus",
    price: "৳350",
    contact: "01731-847198",
    description: "Almost new DSA book, no missing pages."
  },
  {
    id: 2,
    img: "https://i.ibb.co/9q7N8zH/room.jpg",
    title: "Single Room Available",
    category: "Room",
    location: "Mirpur-2",
    price: "৳6,500 / month",
    contact: "01845-XXXXXX",
    description: "Bachelor friendly room near university."
  },
  {
    id: 3,
    img: "https://i.ibb.co/tzCzZLk/cycle.jpg",
    title: "Mountain Bicycle",
    category: "Vehicle",
    location: "Mohammadpur",
    price: "৳7,000",
    contact: "01922-XXXXXX",
    description: "Good condition, used for 6 months."
  },
  {
    id: 4,
    img: "https://i.ibb.co/2kz1f6H/calculator.jpg",
    title: "Scientific Calculator",
    category: "Gadget",
    location: "Dhanmondi",
    price: "৳900",
    contact: "01688-XXXXXX",
    description: "Perfect for engineering students."
  }
];

const Posts = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-4 my-16">

      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Latest Posts</h2>
        <p className="text-gray-500 mt-2">
          Buy & sell items easily inside your campus
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition"
          >
            <img
              src={post.img}
              alt={post.title}
              className="h-44 w-full object-cover rounded-t-xl"
            />

            <div className="p-4 space-y-2">
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                {post.category}
              </span>

              <h3 className="font-semibold text-lg">{post.title}</h3>

              <p className="text-sm text-gray-500">📍 {post.location}</p>
              <p className="font-bold text-green-600">💰 {post.price}</p>

              {/* Buttons */}
              <div className="flex gap-2 pt-3">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="w-1/2 py-2 rounded-lg border border-blue-500 text-blue-600 font-medium hover:bg-blue-50 transition"
                >
                  Details
                </button>

                <button
                  className="w-1/2 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  Contact
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All */}
      <div className="text-center mt-12">
        <Link to="/posts">
          <button className="px-8 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition">
            View All Posts
          </button>
        </Link>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 40 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 relative"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                ✕
              </button>

              <img
                src={selectedPost.img}
                alt=""
                className="w-full h-52 object-cover rounded-xl mb-4"
              />

              <h3 className="text-2xl font-bold">{selectedPost.title}</h3>

              <p className="text-sm text-gray-500 mt-1">
                {selectedPost.category} • {selectedPost.location}
              </p>

              <p className="text-xl font-semibold text-green-600 mt-2">
                {selectedPost.price}
              </p>

              <p className="text-gray-700 mt-3">
                {selectedPost.description}
              </p>

              <p className="mt-3 font-medium">
                📞 {selectedPost.contact}
              </p>

              <button className="mt-5 w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                Contact Seller
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Posts;
