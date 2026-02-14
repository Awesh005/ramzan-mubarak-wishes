import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();
  
  // Determine active route
  const isCalendar = location.pathname === '/calendar';
  const isHome = location.pathname === '/' || location.pathname === '/generator' || location.pathname === '/wish';
  
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center 
                 bg-emerald-950/20 backdrop-blur-md 
                 border-b border-white/5
                 transition-colors duration-300"
    >
      <Link to="/" className="flex items-center gap-2 cursor-pointer group">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-600 to-gold-300 
                        flex items-center justify-center text-emerald-950 font-bold font-serif
                        shadow-lg shadow-gold-500/30">
          R
        </div>
        <span className="text-gold-100 font-serif font-semibold tracking-wide 
                         hidden sm:block group-hover:text-gold-400 
                         transition-colors">
          Ramzan 2026
        </span>
      </Link>

      <div className="flex items-center gap-3">
        {/* Navigation Buttons */}
        <div className="flex gap-2 bg-black/30 p-1 rounded-full 
                        border border-white/10 backdrop-blur-xl">
          <Link
            to="/"
            className={`px-4 py-2 rounded-full text-sm font-sans flex items-center gap-2 transition-all duration-300 ${
              isHome
                ? 'bg-gold-500 text-emerald-950 font-medium shadow-lg' 
                : 'text-emerald-200/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home size={16} />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link
            to="/calendar"
            className={`px-4 py-2 rounded-full text-sm font-sans flex items-center gap-2 transition-all duration-300 ${
              isCalendar
                ? 'bg-gold-500 text-emerald-950 font-medium shadow-lg' 
                : 'text-emerald-200/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar size={16} />
            <span className="hidden sm:inline">Calendar</span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};