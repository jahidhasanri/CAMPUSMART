import React from 'react';

import { FaShoppingCart, FaTrashAlt, FaMapMarkerAlt } from "react-icons/fa";
import SharedBanner from '../../../components/Shared/SharedBanner';

const wishlist = [
  { id: 1, title: "Modern Gaming Mouse", price: 1500, image: "https://via.placeholder.com/150", type: "Product" },
  { id: 2, title: "Female Student Mess (Attached Bath)", price: 6500, image: "https://via.placeholder.com/150", type: "Room", location: "Dhanmondi" },
];

const MyWishlist = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#3b5d50]">
        <SharedBanner title="MY WISHLIST" subtitle="Items and rooms you've saved to explore or purchase later." />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition group">
              <div className="relative">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover group-hover:scale-105 transition duration-500" />
                <span className="absolute top-3 left-3 bg-[#3b5d50] text-white text-xs px-3 py-1 rounded-full">{item.type}</span>
              </div>
              
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-1">{item.title}</h3>
                {item.location && (
                  <p className="text-gray-500 text-xs flex items-center gap-1 mb-2">
                    <FaMapMarkerAlt /> {item.location}
                  </p>
                )}
                <p className="text-[#3b5d50] font-bold text-xl mb-4">৳{item.price}</p>
                
                <div className="flex gap-3">
                  <button className="flex-1 bg-[#3b5d50] text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#2d4a40] transition">
                    <FaShoppingCart size={14}/> Add to Cart
                  </button>
                  <button className="p-3 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition">
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyWishlist;