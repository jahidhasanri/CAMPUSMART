import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2f4f43] text-gray-200">
      <div className="max-w-[1300px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
          
          {/* BRAND */}
          <div>
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
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Browse Items</li>
              <li className="hover:text-white cursor-pointer">Post Item</li>
              <li className="hover:text-white cursor-pointer">Login / Register</li>
            </ul>
          </div>

          {/* CATEGORIES */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
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
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <p className="text-sm mb-3">📧 support@campusmart.com</p>
            <p className="text-sm mb-4">📞 +880 1234-567890</p>

            <div className="flex gap-4 text-xl">
              <FaFacebook className="hover:text-white cursor-pointer" />
              <FaLinkedin className="hover:text-white cursor-pointer" />
              <FaGithub className="hover:text-white cursor-pointer" />
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-600 mt-10 pt-6 text-center text-sm">
          © {new Date().getFullYear()} CampusMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
