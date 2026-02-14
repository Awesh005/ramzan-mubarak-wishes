import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { Moon } from '../components/Moon';
import { ArrowRight } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-gold-500/20 rounded-full blur-3xl"></div>
        <Moon className="w-24 h-24 mx-auto mb-6 text-gold-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 mb-4 pb-2">
          Ramzan Mubarak
        </h1>
        <p className="text-2xl font-serif text-emerald-200/80 mb-2">2026</p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-lg text-emerald-100/70 font-sans max-w-md mx-auto leading-relaxed"
      >
        Embrace the blessings of the holy month. Send beautiful, personalized Ramadan wishes to your friends and family.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="pt-4"
      >
        <Button onClick={onStart}>
          Create Wish <ArrowRight size={18} />
        </Button>
      </motion.div>
    </div>
  );
};