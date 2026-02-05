/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import { IoLocationSharp } from "react-icons/io5";

/* ------------------ Animation Variants ------------------ */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Posts = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const axiosInstance = useAxios();
  const { data: posts = [], isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/all-posts?limit=8`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center my-20 font-bold text-[#3C5D50]">Loading Posts...</div>;
  if (isError) return <div className="text-center my-20 text-red-500">Failed to load posts.</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 my-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#3C5D50]">Latest Posts</h2>
        <p className="text-gray-500 mt-2">Buy & sell items easily inside your campus</p>
      </div>

     <motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
>
  {posts.map((post) => (
    <motion.div
      key={post._id}
      variants={cardVariants}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition flex flex-col h-full"
    >
      <img
        src={post.image}
        alt={post.title}
        className="h-44 w-full object-cover rounded-t-xl"
      />

      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-wider bg-green-100 text-[#3C5D50] px-2 py-1 rounded-full font-bold">
            {post.category}
          </span>
          <h3 className="font-semibold text-lg mt-2 leading-tight">{post.title}</h3>

          {/* Location with truncate & Google Maps link */}
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
            <IoLocationSharp />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(post.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate w-full hover:underline block"
              title={post.location} // Hover করলে full text দেখাবে
            >
              {post.location}
            </a>
          </p>

          <p className="font-bold text-[#3C5D50] mt-2">BDT {post.price}</p>
        </div>

        <div className="flex gap-2 pt-4 mt-auto">
          <button
            onClick={() => setSelectedPost(post)}
            className="w-1/2 py-2 rounded-lg border border-[#3C5D50] text-[#3C5D50] font-medium hover:bg-green-50 transition"
          >
            Details
          </button>
          <a
            href={`tel:${post.number}`}
            className="w-1/2 py-2 rounded-lg bg-[#3C5D50] text-white text-center font-medium hover:opacity-90 transition"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.div>
  ))}
</motion.div>


      {/* Modal Section */}
     <AnimatePresence>
  {selectedPost && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl"
      >
        <button
          onClick={() => setSelectedPost(null)}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Image with border & shadow */}
        <img
          src={selectedPost.image}
          className="w-full h-56 object-cover rounded-xl mb-4 border border-gray-200 shadow-md"
        />

        <h3 className="text-2xl font-bold text-gray-800">{selectedPost.title}</h3>

        <p className="text-[#3C5D50] font-semibold mt-1">
          Category: {selectedPost.category}
        </p>

        {/* Location */}
         <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
            <IoLocationSharp />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPost.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate w-full hover:underline block"
              title={selectedPost.location} // Hover করলে full text দেখাবে
            >
              {selectedPost.location}
            </a>
          </p>

        <p className="text-gray-600 mt-3 leading-relaxed">{selectedPost.description}</p>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 italic">
            Posted by: {selectedPost.postedBy?.ownerName}
          </p>
          <p className="font-bold text-lg text-[#3C5D50] mt-1">
            Price: {selectedPost.price} BDT
          </p>
          {/* Contact Number */}
          <p className="text-sm text-gray-700 mt-1">
            Contact: <a href={`tel:${selectedPost.number}`} className="font-medium">{selectedPost.number}</a>
          </p>
        </div>

        <a
          href={`tel:${selectedPost.number}`}
          className="mt-6 block w-full py-3 rounded-xl bg-[#3C5D50] text-white text-center font-semibold shadow-lg"
        >
          Call Seller ({selectedPost.number})
        </a>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </section>
  );
};

export default Posts;