/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
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
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all"
          >
            <img
              src={post.img}
              alt={post.title}
              className="h-48 w-full object-cover rounded-t-xl"
            />

            <div className="p-4 space-y-2">
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                {post.category}
              </span>

              <h3 className="font-semibold text-lg">{post.title}</h3>

              <p className="text-sm text-gray-500">
                📍 {post.location}
              </p>

              <p className="font-bold text-green-600">
                💰 {post.price}
              </p>

              <p className="text-sm text-gray-600">
                {post.description}
              </p>

              <p className="text-sm text-gray-700">
                📞 {post.contact}
              </p>

              {/* Buttons */}
              <div className="flex gap-2 pt-3">
                <button className="btn btn-sm btn-outline w-1/2">
                  Details
                </button>
                <button className="btn btn-sm btn-primary w-1/2">
                  Contact
                </button>
                <button className="btn btn-primary">Primary</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link to="/posts">
          <button className="btn btn-wide btn-secondary">
            View All Posts
          </button>
        </Link>
      </div>

    </section>
  );
};

export default Posts;
