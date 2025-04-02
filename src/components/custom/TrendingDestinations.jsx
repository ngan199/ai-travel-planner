import React from 'react'
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

const destinations = [
  {
    name: "Bali, Indonesia",
    image: "/bali.webp",
    description: "Tropical paradise with stunning beaches and cultural wonders.",
  },
  {
    name: "Paris, France",
    image: "/paris.jpg",
    description: "The city of love, rich in history, fashion, and fine dining.",
  },
  {
    name: "Kyoto, Japan",
    image: "/japan.jpg",
    description: "Ancient temples, cherry blossoms, and traditional tea houses.",
  },
  {
    name: "Santorini, Greece",
    image: "/santorini.jpeg",
    description: "Breathtaking views, blue-domed churches, and romantic sunsets.",
  },
  {
    name: "Swiss Alps, Switzerland",
    image: "/switzerland.jpg",
    description: "Snowy peaks, scenic landscapes, and adventure sports.",
  },
];

function TrendingDestinations() {
  return (
    <div className="px-10 py-16 bg-gray-100 dark:bg-gray-900">
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
        Trending Destinations 🌍
      </h2>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {destinations.map((destination, index) => (
          <motion.div
            key={index}
            className="relative group overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {/* Destination Image */}
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-56 object-cover group-hover:opacity-80 transition"
            />

            {/* Overlay & Content */}
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-white p-4">
              <h3 className="text-lg font-semibold">{destination.name}</h3>
              <p className="text-sm text-center">{destination.description}</p>
              <Button className="mt-4 bg-[#f56551] hover:bg-[#d45042] px-4 py-2 text-sm">
                Plan Now
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default TrendingDestinations;