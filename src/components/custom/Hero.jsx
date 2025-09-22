import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Hero() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  });

  useEffect(() => {
    const syncFromStorage = (e) => {
      if (e.key === 'user') {
        try { setUser(e.newValue ? JSON.parse(e.newValue) : null); }
        catch { setUser(null); }
      }
    };
    const onAuthChanged = () => {
      try { setUser(JSON.parse(localStorage.getItem('user'))); }
      catch { setUser(null); }
    };

    // cross-tab updates
    window.addEventListener('storage', syncFromStorage);
    // same-tab updates from Header
    window.addEventListener('auth-changed', onAuthChanged);

    return () => {
      window.removeEventListener('storage', syncFromStorage);
      window.removeEventListener('auth-changed', onAuthChanged);
    };
  }, []);

  const isLoggedIn = !!user;

  const openSignin = () => {
    // tell Header to open its sign-in dialog
    window.dispatchEvent(new Event('open-signin'));
  };

  return (
    <div
      className="relative w-full h-screen flex flex-col justify-center items-center text-white"
      style={{
        backgroundImage: "url('/tanzania.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.h1
          className="font-extrabold text-[50px] leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#f56551]">Discover Your Next Adventure with AI: </span>
          Personalized Itineraries at Your Fingertips
        </motion.h1>

        {isLoggedIn ? (
          <>
            <motion.p
              className="text-xl text-gray-200 mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Welcome{user?.displayName ? `, ${user.displayName}` : ''}! Create a new trip in seconds —
              just pick a destination, budget, and duration. Your plans are saved to your history.
            </motion.p>

            <motion.div
              className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link to="/create-trip">
                <Button className="px-6 py-3 text-lg bg-[#f56551] hover:bg-[#d45042] transition-transform hover:scale-105">
                  Create Trip
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <FeatureCard title="Smart Planning" desc="Gemini-powered itineraries tailored to your time and budget." />
              <FeatureCard title="One-Click Start" desc="Destination, budget, duration — done." />
              <FeatureCard title="Always Saved" desc="Every plan is stored so you can revisit anytime." />
            </motion.div>
          </>
        ) : (
          <>
            <motion.p
              className="text-xl text-gray-300 mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Your personal trip planner and travel curator. Create custom itineraries in seconds —
              no spreadsheets, no stress.
            </motion.p>

            <motion.div
              className="mt-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {/* open Header's sign-in dialog from here */}
              <Button
                onClick={openSignin}
                className="px-6 py-3 text-lg bg-[#f56551] hover:bg-[#d45042] transition-transform hover:scale-105"
              >
                Get started — it’s free
              </Button>
            </motion.div>

            <motion.div
              className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <FeatureCard title="AI Itineraries" desc="Let AI plan daily activities, routes, and pacing." />
              <FeatureCard title="Budget-Aware" desc="Plans adapt to your budget and time." />
              <FeatureCard title="Fast Setup" desc="Pick destination, budget, duration — that’s it." />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/10">
      <h3 className="font-semibold text-white text-lg">{title}</h3>
      <p className="text-gray-200 mt-1">{desc}</p>
    </div>
  );
}

export default Hero;
