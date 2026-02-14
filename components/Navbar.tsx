import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Home, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: 'home' | 'calendar') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center 
                 bg-emerald-950/20 dark:bg-emerald-950/20 backdrop-blur-md 
                 border-b border-white/5 dark:border-white/5
                 transition-colors duration-300"
    >
      <div 
        className="flex items-center gap-2 cursor-pointer group" 
        onClick={() => onNavigate('home')}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-600 to-gold-300 
                        dark:from-gold-600 dark:to-gold-300
                        flex items-center justify-center text-emerald-950 font-bold font-serif
                        shadow-lg shadow-gold-500/30">
          R
        </div>
        <span className="text-gold-100 dark:text-gold-100 font-serif font-semibold tracking-wide 
                         hidden sm:block group-hover:text-gold-400 dark:group-hover:text-gold-400 
                         transition-colors">
          Ramzan 2026
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-white/10 dark:bg-white/5 
                     hover:bg-white/20 dark:hover:bg-white/10 
                     transition-all duration-300 group"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-gold-400 group-hover:rotate-180 transition-transform duration-500" />
          ) : (
            <Moon className="w-5 h-5 text-emerald-700 group-hover:-rotate-180 transition-transform duration-500" />
          )}
        </motion.button>

        {/* Navigation Buttons */}
        <div className="flex gap-2 bg-black/30 dark:bg-black/30 p-1 rounded-full 
                        border border-white/10 dark:border-white/10 backdrop-blur-xl">
          <button
            onClick={() => onNavigate('home')}
            className={`px-4 py-2 rounded-full text-sm font-sans flex items-center gap-2 transition-all duration-300 ${
              currentView === 'home' || currentView === 'landing' || currentView === 'generator' || currentView === 'wish'
                ? 'bg-gold-500 dark:bg-gold-500 text-emerald-950 dark:text-emerald-950 font-medium shadow-lg' 
                : 'text-emerald-200/70 dark:text-emerald-200/70 hover:text-white dark:hover:text-white hover:bg-white/5 dark:hover:bg-white/5'
            }`}
          >
            <Home size={16} />
            <span className="hidden sm:inline">Home</span>
          </button>
          <button
            onClick={() => onNavigate('calendar')}
            className={`px-4 py-2 rounded-full text-sm font-sans flex items-center gap-2 transition-all duration-300 ${
              currentView === 'calendar'
                ? 'bg-gold-500 dark:bg-gold-500 text-emerald-950 dark:text-emerald-950 font-medium shadow-lg' 
                : 'text-emerald-200/70 dark:text-emerald-200/70 hover:text-white dark:hover:text-white hover:bg-white/5 dark:hover:bg-white/5'
            }`}
          >
            <Calendar size={16} />
            <span className="hidden sm:inline">Calendar</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};