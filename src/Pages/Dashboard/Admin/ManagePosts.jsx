import React from "react";
import { useQuery } from "@tanstack/react-query";


import { toast } from "react-toastify";
import useAxios from "../../../Hooks/useAxios";


const ManagePosts = () => {
  const axiosInstance = useAxios();


  const { data: posts = [], refetch } = useQuery({
    queryKey: ["manage-posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/all-posts");
      return res.data;
    },
  });


  const handleApprove = async (id) => {
    try {
      const res = await axiosInstance.patch(`/posts/approve/${id}`);


      if (res.data.modifiedCount > 0) {
        toast.success("Post Approved");
        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };


  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete(`/posts/${id}`);


      if (res.data.deletedCount > 0) {
        toast.success("Post Deleted");
        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#3C5D50]">
        Manage Posts
      </h2>


      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm">
         
          {/* Table Head */}
          <thead className="bg-[#3C5D50] text-white">
            <tr className="text-left">
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Price</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>


          {/* Table Body */}
          <tbody>
            {posts.map((post) => (
              <tr key={post._id} className="border-b">


                <td className="p-3">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-14 h-14 rounded object-cover"
                  />
                </td>


                <td className="p-3 font-medium">{post.title}</td>


                <td className="p-3">{post.price} BDT</td>


                <td className="p-3">{post.number}</td>


                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      post.postApprove === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {post.status || "pending"}
                  </span>
                </td>


                <td className="p-3">
                  <div className="flex justify-center gap-2">


                    <button
                      onClick={() => handleApprove(post._id)}
                      disabled={post.status === "approved"}
                      className={`px-3 py-1 rounded text-white text-xs ${
                        post.status === "approved"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      Approve
                    </button>


                    <button
                      onClick={() => handleDelete(post._id)}
                      className="px-3 py-1 rounded bg-red-600 text-white text-xs hover:bg-red-700"
                    >
                      Delete
                    </button>


                  </div>
                </td>


              </tr>
            ))}
          </tbody>


        </table>
      </div>
    </div>
  );
};


export default ManagePosts;
