import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";
import useAxios from "../../Hooks/useAxios";

const CreatePost = () => {
  const axiosInstance = useAxios()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { user } = useContext(AuthContext);
  console.log(user);
  const onSubmit = (data) => {
    console.log("Post Data:", data);
    const photo = data.image[0];

    const formData = new FormData();
    formData.append("image", photo);

    const image_API_URL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;

    axios.post(image_API_URL, formData).then((res) => {
      // console.log(res.data.data.url);
      const photoURL = res.data.data.url;
      const postData = {
        ...data,
        price: parseFloat(data.price),
        image: photoURL,
        status: "pending",
        postedBy: {
            ownerName: user?.displayName,
            ownerEmail: user?.email,
            ownerNumber:data.number
        },
        createdAt : new Date()
      };
      axiosInstance.post("/create-post",postData)
      .then((res)=>{
        console.log(res.data);
        toast.success("Post Created Successfully!");
        reset();
      })

    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div
          style={{ backgroundColor: "#3C5D50" }}
          className="py-6 px-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold">Create a New Post</h2>
          <p className="text-sm opacity-80 mt-1">
            Fill in the details to list your seat or items
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              className={`w-full p-2.5 border rounded-lg outline-none transition ${errors.title ? "border-red-500" : "focus:border-[#3C5D50]"}`}
              placeholder="e.g. Single Seat for Rent"
            />
            {errors.title && (
              <span className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category
              </label>
              <select
                {...register("category")}
                className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#3C5D50]"
              >
                <option value="housing">Housing</option>
                <option value="marketplace">Marketplace</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Price (BDT)
              </label>
              <input
                type="number"
                {...register("price", { required: "Price is required" })}
                className={`w-full p-2.5 border rounded-lg outline-none transition ${errors.price ? "border-red-500" : "focus:border-[#3C5D50]"}`}
                placeholder="2500"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Location
            </label>
            <input
              {...register("location", { required: "Location is required" })}
              className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#3C5D50]"
              placeholder="e.g. Near Varsity Gate 1"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              rows="3"
              className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#3C5D50]"
              placeholder="Mention details like floor, utilities, or item condition..."
            ></textarea>
          </div>

          {/* number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              {...register("number", {required : "number is required"})}
              className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#3C5D50]"
              placeholder="+8801123456789"
            ></input>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Image File
            </label>
            <input
              {...register("image")}
              type="file"
              className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#3C5D50]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.01]"
            style={{ backgroundColor: "#3C5D50" }}
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
