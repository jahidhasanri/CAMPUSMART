import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxios from "../../../Hooks/useAxios";
import SharedBanner from "../../../components/Shared/SharedBanner";

const CreatePost = () => {
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    setLoading(true);
    const photo = data.image[0];

    if (!photo) {
      toast.error("Please upload an image!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", photo);

    const image_API_URL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;

    try {
      
      const res = await axios.post(image_API_URL, formData);
      const photoURL = res.data.data.url;

      
      const postData = {
        title: data.title,
        category: data.category,
        location: data.location,
        description: data.description,
        price: parseFloat(data.price),
        image: photoURL,
        status: "pending",
        postedBy: {
          ownerName: user?.displayName,
          ownerEmail: user?.email,
          ownerNumber: data.number,
        },
        createdAt: new Date(),
      };
      const dbRes = await axiosInstance.post("/create-post", postData);
      if (dbRes.data) {
        toast.success("Post Created Successfully! Awaiting admin approval.");
        reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      <div className="bg-[#3b5d50]">
        <SharedBanner
          title="CREATE NEW POST"
          subtitle="List your products, rooms, or gadgets easily. Make sure to provide accurate details for faster approval."
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 flex justify-center">
        <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-[#3b5d50] py-6 px-8 text-white text-center">
            <h2 className="text-2xl font-bold italic">Campus Mart Listing</h2>
            <p className="text-sm opacity-80">Share what you have with the campus community</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                <input
                  {...register("title", { required: "Title is required" })}
                  className={`w-full p-3 border rounded-xl outline-none transition ${
                    errors.title ? "border-red-500 shadow-sm" : "focus:border-[#3b5d50] focus:ring-1 focus:ring-[#3b5d50]"
                  }`}
                  placeholder="e.g. Single Seat for Rent near UIU"
                />
                {errors.title && <span className="text-red-500 text-xs mt-1">{errors.title.message}</span>}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                <select
                  {...register("category", { required: "Category is required" })}
                  className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-[#3b5d50] bg-white transition cursor-pointer"
                >
                  <option value="">Select Category</option>
                  <option value="housing">Housing/Mess</option>
                  <option value="marketplace">Marketplace</option>
                  <option value="electronics">Electronics / Gadgets</option>
                  <option value="stationery">Stationery / Books</option>
                  <option value="apparel">Apparel / Campus Wear</option>
                </select>
                {errors.category && <span className="text-red-500 text-xs mt-1">{errors.category.message}</span>}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Price (BDT)</label>
                <input
                  type="number"
                  {...register("price", { required: "Price is required" })}
                  className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-[#3b5d50] transition"
                  placeholder="Enter amount"
                />
                {errors.price && <span className="text-red-500 text-xs mt-1">{errors.price.message}</span>}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Location</label>
                <input
                  {...register("location", { required: "Location is required" })}
                  className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-[#3b5d50] transition"
                  placeholder="e.g. Basundhara R/A, Block C"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Contact Number</label>
                <input
                  {...register("number", {
                    required: "Number is required",
                    pattern: {
                      value: /^(\+8801|01)[3-9][0-9]{8}$/,
                      message: "Invalid Bangladesh phone number"
                    }
                  })}
                  className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-[#3b5d50] transition"
                  placeholder="017XXXXXXXX"
                />
                {errors.number && <span className="text-red-500 text-xs mt-1">{errors.number.message}</span>}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-[#3b5d50] transition"
                  placeholder="Tell us more about the condition, floor, or facilities..."
                ></textarea>
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">Upload Product Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-[#3b5d50] transition cursor-pointer relative">
                  <div className="space-y-1 text-center text-gray-600">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-sm">Click to upload a clear image</p>
                    <input
                      {...register("image", { required: "Image is required" })}
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 text-white font-bold rounded-xl transition-all duration-300 shadow-lg transform active:scale-95 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#3b5d50] hover:bg-[#2d4a40]"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </span>
              ) : "Create Listing"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;