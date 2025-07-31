import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Nav */}
      <motion.div
        className="hidden md:flex absolute top-0 left-0 w-full px-8 py-4 items-center justify-between text-white z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Logo */}
        <div className="flex items-center invert brightness-0 hover:brightness-100 hover:invert-0 transition-all duration-300">
          <img
            src="/images/Builtup logo square.png"
            alt="BuiltUp Logo"
            className="h-30 w-auto -mt-4 -mb-2"
          />
        </div>

        {/* Centered Nav Links */}
        <ul className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8 text-md font-medium mx-auto">
          <li>
            <a href="#home" className="hover:text-gray-300 cursor-pointer">
              Home
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-gray-300 cursor-pointer">
              Services
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-300 cursor-pointer">
              Contact
            </a>
          </li>
        </ul>
      </motion.div>

      {/* Mobile Nav */}
      <div className="md:hidden fixed top-0 left-0 w-full flex items-center justify-between px-4 py-4 z-30">
        {/* Left spacer */}
        <div className="w-8" />

        {/* Centered logo */}
        <div className="flex-1 flex justify-center">
          <img
            src="/images/Builtup logo square.png"
            alt="BuiltUp Logo"
            className="h-14 w-auto -mt-2 -mb-2"
          />
        </div>

        {/* Hamburger menu */}
        <button onClick={() => setMenuOpen(true)}>
          <Menu className="text-white w-8 h-8" />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-40 flex flex-col items-center justify-center space-y-8 text-white text-xl">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4"
          >
            <X className="w-8 h-8" />
          </button>
          <a
            href="#home"
            onClick={() => setMenuOpen(false)}
            className="hover:text-orange-400"
          >
            Home
          </a>
          <a
            href="#services"
            onClick={() => setMenuOpen(false)}
            className="hover:text-orange-400"
          >
            Services
          </a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="hover:text-orange-400"
          >
            Contact
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
