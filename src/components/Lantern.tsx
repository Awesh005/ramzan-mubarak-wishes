import * as React from 'react';
import { motion } from 'framer-motion';

interface LanternProps {
  className?: string;
  delay?: number;
}

export const Lantern: React.FC<LanternProps> = ({ className = "", delay = 0 }) => {
  return (
    <motion.div 
      className={`absolute z-0 ${className}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay, type: "spring" }}
    >
      <motion.div
        animate={{ y: [0, 8, 0], rotate: [0, 1, -1, 0] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: delay 
        }}
        className="relative flex flex-col items-center"
      >
        {/* String */}
        <div className="w-0.5 h-24 bg-gold-400/50"></div>
        
        {/* Lantern Body */}
        <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]">
          <path d="M30 0L45 15L40 60L30 70L20 60L15 15L30 0Z" fill="url(#lanternGradient)" stroke="#FBBF24" strokeWidth="1.5"/>
          <path d="M30 70V80" stroke="#FBBF24" strokeWidth="1"/>
          <circle cx="30" cy="80" r="3" fill="#FBBF24"/>
          
          {/* Inner Light */}
          <path d="M30 20L38 30L35 50L30 55L25 50L22 30L30 20Z" fill="rgba(251,191,36,0.6)" className="animate-pulse"/>
          
          <defs>
            <linearGradient id="lanternGradient" x1="30" y1="0" x2="30" y2="70" gradientUnits="userSpaceOnUse">
              <stop stopColor="#111827"/>
              <stop offset="1" stopColor="#064E3B"/>
            </linearGradient>
          </defs>
        </svg>
        
        {/* Glow effect */}
        <div className="absolute top-[80px] w-16 h-16 bg-gold-400/10 rounded-full blur-xl animate-pulse"></div>
      </motion.div>
    </motion.div>
  );
};