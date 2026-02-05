/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Banner from "../../components/Shared/Banner";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { IoLocationSharp } from "react-icons/io5";

// Card animation
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Categories for filtering
const categories = [
  { value: "", label: "All Categories" },
  { value: "housing", label: "Housing" },
  { value: "marketplace", label: "Marketplace" },
  { value: "electronics", label: "Electronics / Gadgets" },
  { value: "stationery", label: "Stationery / Books" },
  { value: "apparel", label: "Apparel / Campus Wear" },
  { value: "sports", label: "Sports / Fitness" },
  { value: "personal_care", label: "Personal Care / Health" },
  { value: "accessories", label: "Electronics Accessories" },
  { value: "events", label: "Events / Campus Life" },
];

Modal.setAppElement("#root"); // For accessibility

const PostsPage = () => {
  const axiosInstance = useAxios();

  // Fetch posts from API
  const { data: posts = [], isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/all-posts`);
      return res.data;
    },
  });

  console.log(posts)

  // State
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  const postsPerPage = 16;

  // Filter by category
  const filteredPosts = selectedCategory
    ? posts.filter((p) => p.category === selectedCategory)
    : posts;

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-[#3b5d50]">
        <Banner
          title="CampusMart Posts"
          subtitle="Stay updated with all the latest student resources, tips, and announcements in one place."
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8">
  {/* Category Filter at top-right */}
  <div className="mb-6 flex justify-end">
    <select
      value={selectedCategory}
      onChange={(e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1);
      }}
      className="border rounded px-3 py-2 w-full max-w-xs"
    >
      {categories.map((cat) => (
        <option key={cat.value} value={cat.value}>
          {cat.label}
        </option>
      ))}
    </select>
  </div>

  {/* Posts Grid */}
  {isLoading ? (
    <p className="text-center text-gray-700 mt-10">Loading posts...</p>
  ) : isError ? (
    <p className="text-center text-red-500 mt-10">Error loading posts</p>
  ) : filteredPosts.length === 0 ? (
    <p className="text-center text-gray-700 mt-10">No posts found.</p>
  ) : (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {currentPosts.map((post) => (
        <motion.div
          key={post._id}
          variants={cardVariants}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition flex flex-col h-full"
        >
          {/* Card content */}
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
  )}

  {/* Pagination */}
  {totalPages > 1 && (
    <div className="flex justify-center gap-2 mt-8 flex-wrap">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 rounded m-1 ${
            currentPage === i + 1
              ? "bg-green-600 text-white"
              : "bg-white text-[#3C5D50] border border-[#3C5D50]"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  )}
</div>


      {/* Details Modal */}
    {selectedPost && (
  <Modal
    isOpen={!!selectedPost}
    onRequestClose={() => setSelectedPost(null)}
    className="max-w-3xl mx-auto mt-50 bg-white rounded-lg shadow-2xl p-6 outline-none"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
  >
    <div className="flex flex-col md:flex-row gap-6">
      {/* Image with border & shadow */}
      <img
        src={selectedPost.image}
        alt={selectedPost.title}
        className="w-full md:w-1/2 h-64 object-cover rounded-lg border border-gray-200 shadow-md"
      />

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{selectedPost.title}</h3>

          <p className="text-[#3C5D50] font-semibold mt-1">
            Category: {selectedPost.category}
          </p>

          {/* Location */}
          <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
            <IoLocationSharp />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPost.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate w-full hover:underline block"
              title={selectedPost.location}
            >
              {selectedPost.location}
            </a>
          </p>

          <p className="text-gray-600 mt-3 leading-relaxed">{selectedPost.description}</p>
        </div>

        {/* Posted info + price */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 italic">
            Posted by: {selectedPost.postedBy?.ownerName}
          </p>
          <p className="font-bold text-lg text-[#3C5D50] mt-1">
            Price: {selectedPost.price} BDT
          </p>
          <p className="text-sm text-gray-700 mt-1">
            Contact: <span className="font-medium">{selectedPost.number}</span>
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <a
            href={`tel:${selectedPost.number}`}
            className="px-4 py-2 bg-[#3C5D50] text-white rounded-lg hover:opacity-90 transition text-center"
          >
            Call Seller
          </a>
          <button
            onClick={() => setSelectedPost(null)}
            className="px-4 py-2 border border-[#3C5D50] rounded-lg hover:bg-gray-100 transition text-center"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </Modal>
)}

    </div>
  );
};

export default PostsPage;
