
import { useState } from "react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "POSTS", path: "/products" },
    { name: "SERVICES", path: "/services" },
    { name: "ABOUT US", path: "/about" },
    { name: "BLOG", path: "/blog" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <header className="bg-[#1d2b1e] text-white">
      <div className="max-w-322.5 mx-auto px-2 py-5">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
         <Link href={'/'}>
          <img src="/images/logo.png" alt="Green Nest Logo" />
         </Link>

          {/* Desktop Menu (lg only) */}
          <ul className="hidden lg:flex gap-10 font-normal text-sm">
            {navLinks.map((link) => {
              return (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`pb-1 transition-all duration-300`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Cart + Login (md and up) */}
          <Link href={'/login'} className="hidden md:flex items-center gap-6">
            <TiShoppingCart
              size={26}
              className="cursor-pointer hover:text-[#5a8139]"
            />
            <button className="bg-[#5a8139] hover:bg-[#5b8139d7] px-4 py-1.5 cursor-pointer rounded">
              Login
            </button>
          </Link>

          {/* Hamburger (md & sm only) */}
          <div className="lg:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile + Tablet Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4">
            <ul className="flex flex-col gap-4 font-medium">
              {navLinks.map((link) => {
                return (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`block pb-1`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

                <Link href={'/login'} className=" md:hidden items-center gap-6">
            <TiShoppingCart
              size={26}
              className="cursor-pointer mb-5 mt-5 hover:text-[#5a8139]"
            />
            <button className="bg-[#5a8139] mb-5 hover:bg-[#5b8139d7] px-4 py-1.5 cursor-pointer rounded">
              Login
            </button>
          </Link>

          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
