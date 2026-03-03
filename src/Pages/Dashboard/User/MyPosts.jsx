import React, { useState } from 'react';

import { FaEdit, FaTrash, FaBed, FaTag, FaCheckCircle, FaClock } from "react-icons/fa";
import SharedBanner from '../../../components/Shared/SharedBanner';

const initialPosts = [
  { id: 1, title: "Used HP Laptop", price: 25000, type: "Product", status: "Approved", date: "2024-05-10" },
  { id: 2, title: "Single Room near UIU", price: 5500, type: "Room", status: "Pending", date: "2024-05-12" },
  { id: 3, title: "Calculus Textbook", price: 300, type: "Product", status: "Approved", date: "2024-05-14" },
];

const MyPosts = () => {
  const [posts, setPosts] = useState(initialPosts);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      <div className="bg-[#3b5d50]">
        <SharedBanner 
          title="MY LISTINGS" 
          subtitle="Manage your posted products and room rentals. You can edit, delete or check the approval status of your posts here."
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Your Activity Summary</h2>
          <span className="bg-[#3b5d50] text-white px-4 py-1 rounded-full text-sm">
            Total Posts: {posts.length}
          </span>
        </div>

       
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-bold">
              <tr>
                <th className="px-6 py-4">Title & Type</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-[#3b5d50] rounded-lg">
                        {post.type === "Room" ? <FaBed /> : <FaTag />}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{post.title}</p>
                        <p className="text-xs text-gray-500">{post.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">৳{post.price}</td>
                  <td className="px-6 py-4">
                    {post.status === "Approved" ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm font-bold">
                        <FaCheckCircle /> Approved
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-orange-500 text-sm font-bold">
                        <FaClock /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{post.date}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-4">
                      <button className="text-blue-500 hover:text-blue-700 transition" title="Edit">
                        <FaEdit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="text-red-500 hover:text-red-700 transition" 
                        title="Delete"
                      >
                        <FaTrash size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {posts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-400 italic">No posts found. Start listing your items!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPosts;