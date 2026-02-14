import * as React from 'react';
import { motion } from 'framer-motion';

interface StarProps {
  className?: string;
  delay?: number;
  size?: number;
}

export const Star: React.FC<StarProps> = ({ className = "", delay = 0, size = 4 }) => {
  return (
    <motion.div
      className={`absolute rounded-full bg-white ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ 
        duration: 3, 
        delay: delay, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    />
  );
};