import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Hero() {
  return (
    <div 
      className="relative w-full h-screen flex flex-col justify-center items-center text-white"
      style={{
        backgroundImage: "url('/tanzania.jpg')",  // Change to a high-quality travel image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark Overlay for Better Text Visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6">
        <motion.h1 
          className="font-extrabold text-[50px] leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#f56551]">Discover Your Next Adventure with AI: </span>
          Personalized Itineraries at Your Fingertips
        </motion.h1>

        <motion.p 
          className="text-xl text-gray-300 mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Your personal trip planner and travel curator, 
          creating custom itineraries tailored to your interests and budget.
        </motion.p>

        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link to="/create-trip">
            <Button className="px-6 py-3 text-lg bg-[#f56551] hover:bg-[#d45042] transition-transform transform hover:scale-105">
              Get Started, it's Free
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;