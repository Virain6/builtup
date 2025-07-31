import { motion } from "framer-motion";
import imageUrl from "/images/main.jpg";
import Navbar from "../components/NavBar"; // adjust path as needed

const Hero = () => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/80"></div>

      {/* ✅ Navbar */}
      <Navbar />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          From Blueprint to Reality. We Nailed It.
        </h1>
      </motion.div>
    </div>
  );
};

export default Hero;
