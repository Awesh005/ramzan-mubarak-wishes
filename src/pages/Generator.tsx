import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { WishStyle } from '../types';
import { Sparkles, ArrowLeft } from 'lucide-react';

export const Generator: React.FC = () => {
  const navigate = useNavigate();
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [style, setStyle] = useState<WishStyle>(WishStyle.CLASSIC);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sender.trim()) {
      // Navigate to wish page with query params
      const params = new URLSearchParams();
      params.append('sender', sender);
      if (receiver.trim()) params.append('receiver', receiver);
      params.append('style', style);
      
      navigate(`/wish?${params.toString()}`);
    }
  };

  const styleOptions = [
    { value: WishStyle.CLASSIC, label: 'Classic', icon: '🕌' },
    { value: WishStyle.MODERN, label: 'Modern', icon: '✨' },
    { value: WishStyle.URDU, label: 'Urdu', icon: '🌙' },
    { value: WishStyle.EMOTIONAL, label: 'Emotional', icon: '🤲' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <motion.button 
              onClick={() => navigate('/')}
              whileHover={{ x: -4 }}
              className="p-2 rounded-full bg-white/5 text-emerald-200/60 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </motion.button>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gold-400">
              Create a Wish
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-sans font-medium text-gold-200/60 tracking-widest uppercase ml-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="Name of sender"
                className="w-full px-6 py-4 rounded-2xl bg-black/40 border border-emerald-900/50 focus:border-gold-500/70 text-white placeholder-emerald-700/40 outline-none transition-all duration-300 font-sans text-lg shadow-inner"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-sans font-medium text-gold-200/60 tracking-widest uppercase ml-1">
                For (Optional)
              </label>
              <input
                type="text"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                placeholder="Receiver's name"
                className="w-full px-6 py-4 rounded-2xl bg-black/40 border border-emerald-900/50 focus:border-gold-500/70 text-white placeholder-emerald-700/40 outline-none transition-all duration-300 font-sans text-lg shadow-inner"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-sans font-medium text-gold-200/60 tracking-widest uppercase ml-1">
                Writing Style
              </label>
              <div className="grid grid-cols-2 gap-4">
                {styleOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStyle(opt.value)}
                    className={`flex flex-col items-center justify-center p-5 rounded-[1.5rem] border transition-all duration-300 group relative overflow-hidden ${
                      style === opt.value
                        ? 'bg-gold-500/20 border-gold-500/60 text-gold-300 shadow-lg shadow-gold-500/10'
                        : 'bg-black/20 border-emerald-900/30 text-emerald-400/40 hover:bg-black/40 hover:border-emerald-700/50'
                    }`}
                  >
                    <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{opt.icon}</span>
                    <span className="text-sm font-sans font-semibold tracking-wide">{opt.label}</span>
                    {style === opt.value && (
                      <motion.div layoutId="activeStyle" className="absolute inset-0 bg-gold-400/5 pointer-events-none" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <Button type="submit" className="w-full h-16 text-xl shadow-gold-500/20">
                Generate <Sparkles size={20} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};