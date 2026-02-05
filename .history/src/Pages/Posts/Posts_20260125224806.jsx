/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Banner from "../../components/Shared/Banner";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Modal from "react-modal";

// Card animation
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

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
  const { data: posts = [], isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/all-posts`);
      return res.data;
    },
  });

  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  const postsPerPage = 16;

  // Filter by category
  const filteredPosts = selectedCategory
    ? posts.filter((p) => p.category === selectedCategory)
    : posts;

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className=" min-h-screen">
        <div className="bg-[#3b5d50] pl-4">
            <Banner
          title="CampusMart Posts"
          subtitle="Stay updated with all the latest student resources, tips, and announcements in one place."
        />
        </div>
      <div className="">
        

        {/* Category Filter */}
        <div className="my-6 ">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1); // reset page on filter change
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
          <p className="text-center text-white mt-10">Loading posts...</p>
        ) : isError ? (
          <p className="text-center text-red-500 mt-10">Error loading posts</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4"
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
                    <h3 className="font-semibold text-lg mt-2 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">📍 {post.location}</p>
                    <p className="font-bold text-[#3C5D50] mt-2">
                      BDT {post.price}
                    </p>
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
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-white text-[#3C5D50] border border-[#3C5D50]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Details Modal */}
      {selectedPost && (
        <Modal
          isOpen={!!selectedPost}
          onRequestClose={() => setSelectedPost(null)}
          className="max-w-3xl mx-auto mt-20 bg-white rounded-lg shadow-lg p-6 outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full md:w-1/2 h-64 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#3C5D50] mb-2">
                {selectedPost.title}
              </h2>
              <span className="text-sm uppercase tracking-wider bg-green-100 text-[#3C5D50] px-2 py-1 rounded-full font-bold">
                {selectedPost.category}
              </span>
              <p className="text-gray-500 mt-2">📍 {selectedPost.location}</p>
              <p className="font-bold text-[#3C5D50] mt-2">
                BDT {selectedPost.price}
              </p>
              <p className="mt-4 text-gray-700">{selectedPost.description}</p>

              <div className="mt-6 flex gap-4">
                <a
                  href={`tel:${selectedPost.number}`}
                  className="px-4 py-2 bg-[#3C5D50] text-white rounded-lg hover:opacity-90 transition"
                >
                  Call Seller
                </a>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-2 border border-[#3C5D50] rounded-lg hover:bg-gray-100 transition"
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
