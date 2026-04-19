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
  const [preview, setPreview] = useState(null); // ✅ image preview state

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
        setPreview(null); // reset preview
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
            <p className="text-sm opacity-80">
              Share what you have with the campus community
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Title
                </label>
                <input
                  {...register("title", { required: "Title is required" })}
                  className="w-full p-3 border rounded-xl outline-none focus:border-[#3b5d50]"
                  placeholder="e.g. Single Seat for Rent near UIU"
                />
                {errors.title && (
                  <span className="text-red-500 text-xs">
                    {errors.title.message}
                  </span>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Category
                </label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full p-3 border rounded-xl"
                >
                  <option value="">Select Category</option>
                  <option value="housing">Housing/Mess</option>
                  <option value="marketplace">Marketplace</option>
                  <option value="electronics">Electronics / Gadgets</option>
                  <option value="stationery">Stationery / Books</option>
                  <option value="apparel">Apparel / Campus Wear</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Price (BDT)
                </label>
                <input
                  type="number"
                  {...register("price", { required: "Price is required" })}
                  className="w-full p-3 border rounded-xl"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Location
                </label>
                <input
                  {...register("location", {
                    required: "Location is required",
                  })}
                  className="w-full p-3 border rounded-xl"
                />
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Contact Number
                </label>
                <input
                  {...register("number", {
                    required: "Number is required",
                    pattern: {
                      value: /^(\+8801|01)[3-9][0-9]{8}$/,
                      message: "Invalid Bangladesh phone number",
                    },
                  })}
                  className="w-full p-3 border rounded-xl"
                />
                {errors.number && (
                  <span className="text-red-500 text-xs">
                    {errors.number.message}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows="4"
                  className="w-full p-3 border rounded-xl"
                />
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Upload Product Image
                </label>

                <div className="relative border-2 border-dashed rounded-xl p-6 text-center">
                  <input
                    {...register("image", {
                      required: "Image is required",
                    })}
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setPreview(URL.createObjectURL(file)); // ✅ preview fix
                      }
                    }}
                  />

                  <p className="text-gray-500">
                    Click or drag image to upload
                  </p>

                  {/* ✅ Image Preview */}
                  {preview && (
                    <div className="mt-4 flex justify-center">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded-xl border"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#3b5d50] text-white rounded-xl font-bold"
            >
              {loading ? "Uploading..." : "Create Listing"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;