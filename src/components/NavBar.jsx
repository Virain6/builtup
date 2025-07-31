import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full px-8 py-4 flex items-center justify-between text-white z-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Logo */}
      <div className="flex items-center  invert brightness-0 hover:brightness-100 hover:invert-0 transition-all duration-300">
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
  );
};

export default Navbar;
