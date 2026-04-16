import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash, FaBed, FaTag, FaCheckCircle, FaClock } from "react-icons/fa";
import SharedBanner from "../../../components/Shared/SharedBanner";
import Swal from "sweetalert2";

import { AuthContext } from "../../../provider/AuthProvider";
import useAxios from "../../../Hooks/useAxios";

const MyPosts = () => {

  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: ""
  });

  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const email = user?.email;

  useEffect(() => {

    if (!email) return;

    const fetchPosts = async () => {
      try {

        const res = await axiosInstance.get(`/posts?email=${email}`);
        setPosts(res.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();

  }, [email, axiosInstance]);



  // DELETE POST
  const handleDelete = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {

      if (result.isConfirmed) {

        try {

          const res = await axiosInstance.delete(`/posts/${id}`);

          if (res.data.deletedCount > 0) {

            setPosts(posts.filter(post => post._id !== id));

            Swal.fire({
              title: "Deleted!",
              text: "Your post has been deleted.",
              icon: "success"
            });

          }

        } catch (error) {
          console.error(error);
        }

      }

    });

  };



  // OPEN EDIT MODAL
  const handleEditClick = (post) => {

    setSelectedPost(post);

    setFormData({
      title: post.title,
      price: post.price,
      image: post.image
    });

    setIsModalOpen(true);
  };



  // INPUT CHANGE
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };



  // IMAGE FILE CHANGE
  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      const imageUrl = URL.createObjectURL(file);

      setFormData({
        ...formData,
        image: imageUrl
      });

    }

  };



  // UPDATE POST
  const handleUpdate = async () => {

    try {

      const res = await axiosInstance.put(
        `/posts/${selectedPost._id}`,
        formData
      );

      if (res.data.modifiedCount > 0) {

        Swal.fire("Updated!", "Post updated successfully", "success");

        setPosts(posts.map(post =>
          post._id === selectedPost._id
            ? { ...post, ...formData }
            : post
        ));

        setIsModalOpen(false);

      }

    } catch (error) {
      console.error(error);
    }

  };



  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="bg-[#3b5d50]">
        <SharedBanner
          title="MY LISTINGS"
          subtitle="Manage your posted products and room rentals."
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Your Activity Summary
          </h2>

          <span className="bg-[#3b5d50] text-white px-4 py-1 rounded-full text-sm">
            Total Posts: {posts.length}
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">

          <table className="w-full text-left">

            <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-bold">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {posts.map((post) => (

                <tr key={post._id} className="hover:bg-gray-50">

                  <td className="px-6 py-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">

                      <div className="p-2 bg-blue-50 text-[#3b5d50] rounded-lg">
                        {post.type === "Room" ? <FaBed /> : <FaTag />}
                      </div>

                      <div>
                        <p className="font-semibold">{post.title}</p>
                        <p className="text-xs text-gray-500">{post.type}</p>
                      </div>

                    </div>
                  </td>

                  <td className="px-6 py-4 font-medium">
                    ৳{post.price}
                  </td>

                  <td className="px-6 py-4">

                    {post.status === "Approved" ? (
                      <span className="flex items-center gap-1 text-green-600 font-bold">
                        <FaCheckCircle /> Approved
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-orange-500 font-bold">
                        <FaClock /> Pending
                      </span>
                    )}

                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-center">

                    <div className="flex justify-center gap-4">

                      <button
                        onClick={() => handleEditClick(post)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>



      {/* EDIT MODAL */}

      {isModalOpen && (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">

          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="text-xl font-bold mb-4">Edit Post</h2>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="file"
              onChange={handleImageChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <img
              src={formData.image}
              alt=""
              className="w-20 h-20 object-cover mb-3"
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Update
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default MyPosts;