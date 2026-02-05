import React from "react";
import Banner from "../../components/Shared/Banner";

const PostsPage = () => {
  return (
    <div className="bg-[#3b5d50]">
      <div className="container mx-auto">
        <Banner 
        title="CampusMart Posts" 
        subtitle="Stay updated with all the latest student resources, tips, and announcements in one place."
      />
      </div>
      
      {/* Posts content here */}
    </div>
  );
};

export default PostsPage;
