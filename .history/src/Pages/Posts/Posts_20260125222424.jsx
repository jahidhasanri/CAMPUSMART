import React from "react";
import Banner from "../../components/Shared/Banner";


const PostsPage = () => {
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
