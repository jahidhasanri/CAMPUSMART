/* eslint-disable no-unused-vars */
import React from "react";
import Banner from "../../components/Shared/Banner";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";


const PostsPage = () => {
     const axiosInstance = useAxios();
  const { data: posts = [], isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/all-posts`);
      return res.data;
    },
    });
  return (
    <div>


    <div className="bg-[#3b5d50]">
      <div className="container mx-auto pb-4">
        <Banner 
        title="CampusMart Posts" 
        subtitle="Stay updated with all the latest student resources, tips, and announcements in one place."
      />
      </div>
      
      {/* Posts content here */}
    </div>




    </div>
  );
};

export default PostsPage;
