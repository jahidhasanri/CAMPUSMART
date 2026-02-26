const WhoWeAre = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-2 ">

        {/* LEFT SIDE */}
        <div className="relative flex justify-center items-center h-[500px]">

          {/* Center Image */}
          <img
            src="https://i.ibb.co.com/XrvscWVk/riyad.jpg"
            alt="Campus Mart"
            className="w-36 h-36 md:w-52 md:h-52 object-cover  rounded-2xl shadow-2xl z-10"
          />

          {/* Top Left */}
          <img
            src="/images/Screenshot_1.png"
            alt=""
            className="absolute w-36 h-36 xl:mr-[105px] xl:mt-[100px] md:w-52 md:h-52 object-cover rounded-2xl shadow-lg 
            -translate-x-40 -translate-y-40"
          />

          {/* Top Right */}
          <img
            src="/images/tausifa.jpg"
            alt=""
            className="absolute w-36 h-36 xl:ml-[105px] xl:mt-[105px] md:w-52 md:h-52 object-cover rounded-2xl shadow-lg 
            translate-x-40 -translate-y-40"
          />

          {/* Bottom Left */}
          <img
            src="https://i.ibb.co.com/xnTmbFY/suriya.jpg"
            alt=""
            className="absolute  w-36 h-36 xl:mr-[105px] xl:mb-[100px] md:w-52 md:h-52 object-cover rounded-2xl shadow-lg 
            -translate-x-40 translate-y-40"
          />

          {/* Bottom Right */}
          <img
            src="https://i.ibb.co.com/N2cmVQbH/limon.jpg"
            alt=""
            className="absolute w-36 h-36 xl:ml-[105px] xl:mb-[105px] md:w-52 md:h-52 object-cover rounded-2xl shadow-lg 
            translate-x-40 translate-y-40"
          />

        </div>

        {/* RIGHT SIDE */}
        <div className="pl-10 mt-14">
          <h2 className=" text-[20px] font-bold text-[#3b5d50] mb-4">
            Who We Are
          </h2>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
           Your Trusted Partner for Campus Services & Marketplace Solutions
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Campus Mart is a student-focused online marketplace designed to simplify campus life. We connect students on one trusted platform where they can buy, sell, and exchange products and services easily. Whether it’s textbooks, electronics, stationery, or dorm essentials, Campus Mart provides a safe and convenient space for students to meet their needs.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            From study materials and electronics to housing and daily essentials, 
            our platform helps students save time, reduce costs, and build a 
            stronger campus community.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Our mission is to make campus life smarter, more affordable, 
            and more connected.
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhoWeAre;