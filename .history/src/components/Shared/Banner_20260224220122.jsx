import React from "react";

const Banner = ({ title, subtitle }) => {
  return (
    <div className="container mx-auto  bg-[#3b5d50] text-white py-28 px-6  md:px-20 lg:px-36 ">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
      <p className="text-md md:text-lg max-w-[940px]">{subtitle}</p>
      {/* Optional CTA */}
      {/* <button className="mt-6 bg-white text-blue-600 font-semibold px-6 py-2 rounded hover:bg-gray-100 transition">
        See All Posts
      </button> */}
    </div>
  );
};

export default Banner;
