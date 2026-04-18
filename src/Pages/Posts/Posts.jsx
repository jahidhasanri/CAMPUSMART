/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import Banner from "../../components/Shared/SharedBanner";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { IoLocationSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

Modal.setAppElement("#root");

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

const PostsPage = () => {

  const { user, fetchCart } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/all-posts?status=approved`);
      return res.data;
    },
  });

  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  const postsPerPage = 12;

  // Filter
  const filteredPosts = selectedCategory
    ? posts.filter((p) => p.category === selectedCategory)
    : posts;

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // ✅ ADD TO CART FUNCTION
  const handleAddToCart = async (post) => {

    if (!user) {
      toast.error("Please login first");
      return;
    }

    const cartItem = {
      postId: post._id,
      title: post.title,
      image: post.image,
      price: post.price,
      location: post.location,
      userInfo: {
        name: user?.displayName,
        email: user?.email,
      },
    };

    try {

      const res = await axiosInstance.post("/cart", cartItem);

      if (res.data.insertedId) {
        toast.success("Item added to cart");
        fetchCart();
      }

      if (res.data.message) {
        toast.error(res.data.message);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Banner */}
      <div className="bg-[#3b5d50]">
        <Banner
          title="CampusMart Posts"
          subtitle="Stay updated with all the latest student resources"
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8">

        {/* Category Filter */}
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

        {/* POSTS GRID */}
        {isLoading ? (
          <p className="text-center mt-10">Loading posts...</p>
        ) : isError ? (
          <p className="text-center text-red-500 mt-10">Error loading posts</p>
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
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition flex flex-col"
              >

                <img
                  src={post.image}
                  className="h-44 w-full object-cover rounded-t-xl"
                />

                <div className="p-4 flex flex-col justify-between flex-grow">

                  <div>
                    <span className="text-[10px] uppercase bg-green-100 text-[#3C5D50] px-2 py-1 rounded-full font-bold">
                      {post.category}
                    </span>

                    <h3 className="font-semibold text-lg mt-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <IoLocationSharp />
                      {post.location}
                    </p>

                    <p className="font-bold text-[#3C5D50] mt-2">
                      BDT {post.price}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-4 mt-auto">

                    <button
                      onClick={() => setSelectedPost(post)}
                      className="w-1/2 py-2 rounded-lg border border-[#3C5D50] text-[#3C5D50]"
                    >
                      Details
                    </button>

                    <a
                      href={`tel:${post.number}`}
                      className="w-1/2 py-2 rounded-lg bg-[#3C5D50] text-white text-center"
                    >
                      Contact
                    </a>

                  </div>

                </div>

              </motion.div>
            ))}
          </motion.div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-green-600 text-white"
                    : "border border-[#3C5D50]"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* MODAL */}
      {selectedPost && (
        <Modal
          isOpen={true}
          onRequestClose={() => setSelectedPost(null)}
          className="max-w-2xl md:max-w-3xl mx-auto mt-40 max-h-[500px] bg-white p-6 rounded-lg"
          overlayClassName="fixed inset-0 bg-black/60 flex justify-center"
        >

          <img
            src={selectedPost.image}
            className="w-full h-64 object-cover rounded-lg"
          />

          <h2 className="text-2xl font-bold mt-4">
            {selectedPost.title}
          </h2>

          <p className="mt-2">{selectedPost.description}</p>

          <p className="mt-2 font-semibold text-[#3C5D50]">
            Price: {selectedPost.price} BDT
          </p>

          <div className="md:flex gap-4 mt-6">

            {/* ✅ ADD TO CART BUTTON */}
            <button
              onClick={() => handleAddToCart(selectedPost)}
              className="px-4 py-2 bg-[#3C5D50] text-white rounded  mr-2 md:mr-0"
            >
              Add To Cart
            </button>

            <button
              href={`tel:${selectedPost.number}`}
              className="px-4 py-2 bg-[#3C5D50] text-white rounded"
            >
              Call Seller
            </button>

            <button
              onClick={() => setSelectedPost(null)}
              className="px-4 py-2 border rounded"
            >
              Close
            </button>

          </div>

        </Modal>
      )}
    </div>
  );
};

export default PostsPage;