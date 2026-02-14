import * as React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Moon } from '../components/Moon';
import { ArrowRight, Sparkles, MessageSquareHeart, Calendar as CalendarIcon } from 'lucide-react';
import { SEO } from '../components/SEO';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <SEO 
        title="Ramzan Mubarak 2026"
        description="Celebrate Ramadan 2026 with our premium web app. Create elegant personalized wishes and track live prayer times with our integrated calendar."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ReligiousHoliday",
          "name": "Ramadan 2026",
          "alternateName": "Ramzan Mubarak",
          "startDate": "2026-02-18",
          "endDate": "2026-03-20",
          "description": "The holy month of Ramadan for the year 2026."
        }}
      />
      {/* Decorative Moon Section */}
      <motion.div variants={itemVariants} className="relative mb-8 md:mb-12">
        <div className="absolute -inset-10 bg-gold-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="relative z-10">
          <Moon className="w-28 h-28 md:w-40 md:h-40 mx-auto text-gold-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]" />
        </div>
      </motion.div>

      {/* Main Heading Section */}
      <motion.div variants={itemVariants} className="space-y-4 md:space-y-6 mb-10 md:mb-16">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-gold-100 via-gold-400 to-gold-600 drop-shadow-sm leading-tight pb-2">
          Ramzan Mubarak
        </h1>
        <div className="flex items-center justify-center gap-4 text-2xl md:text-3xl font-serif text-emerald-100/60 uppercase tracking-[0.2em] md:tracking-[0.4em]">
          <span className="w-8 md:w-16 h-px bg-gold-500/30" />
          <span>2026</span>
          <span className="w-8 md:w-16 h-px bg-gold-500/30" />
        </div>
      </motion.div>

      {/* Description */}
      <motion.p 
        variants={itemVariants} 
        className="text-lg md:text-xl font-sans text-emerald-50/70 max-w-xl mx-auto leading-relaxed mb-12 md:mb-16"
      >
        Welcome the holy month with elegance. Create deeply personalized greetings 
        and stay connected with our integrated Ramadan calendar.
      </motion.p>

      {/* CTA Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mx-auto">
        <Button 
          onClick={() => navigate('/generator')}
          className="group relative h-16 text-lg"
          variant="primary"
        >
          <span className="flex items-center gap-3">
            Create Wish <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </span>
        </Button>
        <Button 
          onClick={() => navigate('/calendar')}
          variant="secondary"
          className="h-16 text-lg border-gold-500/20 bg-white/5 hover:bg-white/10"
        >
          <span className="flex items-center gap-3">
             View Calendar <CalendarIcon className="w-5 h-5" />
          </span>
        </Button>
      </motion.div>

      {/* Feature Badges - Hidden on very small screens, shown above 400px */}
      <motion.div 
        variants={itemVariants} 
        className="hidden sm:flex items-center justify-center gap-8 mt-16 md:mt-24 text-emerald-400/40 text-sm font-sans tracking-widest uppercase"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full border border-emerald-900/50 flex items-center justify-center mb-1">
             <MessageSquareHeart size={18} />
          </div>
          <span>Deep Link Share</span>
        </div>
        <div className="flex flex-col items-center gap-2">
           <div className="w-10 h-10 rounded-full border border-emerald-900/50 flex items-center justify-center mb-1">
             <CalendarIcon size={18} />
          </div>
          <span>Prayer Times</span>
        </div>
      </motion.div>
    </motion.div>
  );
};