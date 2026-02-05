import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, handelLogout } = useContext(AuthContext);
  // console.log(user?.photoURL);
  const navigate = useNavigate();
  const handelSignOut = async (e) => {
    e.preventDefault();
    try {
      await handelLogout();
      toast.success("Logout successful!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`);
    }
  };

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "CREATE POST", path: "/create-post" },
    { name: "SERVICES", path: "/services" },
    { name: "ABOUT US", path: "/about" },
    { name: "BLOG", path: "/blog" },
    { name: "CONTACT", path: "/contact" },
    { name: "ALL POSTS", path: "/all-posts" },
  ];

  return (
    <header className="bg-[#3b5d50] text-white">
      <div className="max-w-[1300px] mx-auto px-2 py-5">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/">
            <img
              src="/images/campu_logo-removebg-preview.png"
              className="w-[150px]"
              alt="CampusMart Logo"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-10 text-sm">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="hover:text-[#a7c957] transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Cart + Auth (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <TiShoppingCart
              size={26}
              className="cursor-pointer hover:text-[#a7c957]"
            />

            {user ? (
              <>
                <img
                  src={user?.photoURL || "/images/default-user.png"}
                  alt="profile"
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
                <button
                  onClick={handelSignOut}
                  className="bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white text-[#3b5d50] px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Hamburger */}
          <div className="lg:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Cart + Auth (Mobile) */}
            <div className="mt-6 flex flex-col gap-4">
              <TiShoppingCart size={26} />

              {user ? (
                <button
                  onClick={() => {
                    handelSignOut();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 px-4 py-2 rounded"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="bg-[#5a8139] px-4 py-2 rounded text-center"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
