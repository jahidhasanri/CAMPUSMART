import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#2f4f43] text-gray-200">
      <div className="max-w-[1300px] mx-auto px-6 py-14">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
          
          {/* BRAND */}
          <div className="">
            <h2 className="text-2xl font-bold text-white mb-4">
              CampusMart
            </h2>
            <p className="text-[16px] leading-relaxed">
              CampusMart is a trusted student marketplace where university
              students can buy and sell rooms, seats, books, and daily
              accessories safely with admin approval.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-[16px] font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white cursor-pointer">Home</Link></li>
              <li><Link to="/all-posts" className="hover:text-white cursor-pointer">Browse Items</Link></li>
              <li><Link to="/post-item" className="hover:text-white cursor-pointer">Post Item</Link></li>
              <li><Link to="/login" className="hover:text-white cursor-pointer">Login / Register</Link></li>
            </ul>
          </div>

          {/* CATEGORIES */}
          <div>
            <h3 className="text-[16px] font-semibold text-white mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Rooms & Seats</li>
              <li className="hover:text-white cursor-pointer">Old Books</li>
              <li className="hover:text-white cursor-pointer">Accessories</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-[16px] font-semibold text-white mb-4">
              Contact Us
            </h3>
            <p className="text-sm mb-3">📧 support@campusmart.com</p>
            <p className="text-sm mb-4">📞 +880 1234-567890</p>

            <div className="flex gap-4 text-xl">
              <Link to={'https://www.facebook.com/BUBTOfficial'} target="_blank"><FaFacebook className="hover:text-white cursor-pointer" /></Link>
              <Link to={'https://www.linkedin.com/school/bangladesh-university-of-business-and-technology/'} target="_blank"><FaLinkedin className="hover:text-white cursor-pointer" /></Link>
              <Link to={'https://github.com/'} target="_blank"><FaGithub className="hover:text-white cursor-pointer" /></Link>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-600 mt-10 pt-6 text-center text-[16px]">
          © {new Date().getFullYear()} CampusMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
