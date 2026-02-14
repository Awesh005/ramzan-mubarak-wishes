import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { WishStyle, WishData } from '../types';
import { Sparkles, Send } from 'lucide-react';

interface GeneratorProps {
  onGenerate: (data: WishData) => void;
  onCancel: () => void;
}

export const Generator: React.FC<GeneratorProps> = ({ onGenerate, onCancel }) => {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [style, setStyle] = useState<WishStyle>(WishStyle.CLASSIC);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sender.trim()) {
      onGenerate({ sender, receiver, style });
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <h2 className="text-3xl font-serif font-bold text-center text-gold-400 mb-8">
          Personalize Your Wish
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-sans text-emerald-200/80 ml-1">Your Name</label>
            <input
              type="text"
              required
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="e.g. Ali Khan"
              className="w-full px-5 py-3 rounded-xl bg-black/30 border border-emerald-900/50 focus:border-gold-500/50 text-white placeholder-emerald-700/50 outline-none transition-all duration-300 font-sans"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-sans text-emerald-200/80 ml-1">Receiver's Name (Optional)</label>
            <input
              type="text"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              placeholder="e.g. Sara"
              className="w-full px-5 py-3 rounded-xl bg-black/30 border border-emerald-900/50 focus:border-gold-500/50 text-white placeholder-emerald-700/50 outline-none transition-all duration-300 font-sans"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-sans text-emerald-200/80 ml-1">Wish Style</label>
            <div className="grid grid-cols-2 gap-3">
              {styleOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStyle(opt.value)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 ${
                    style === opt.value
                      ? 'bg-gold-500/20 border-gold-500 text-gold-400'
                      : 'bg-black/20 border-emerald-900/30 text-emerald-400/60 hover:bg-black/40'
                  }`}
                >
                  <span className="text-2xl mb-1">{opt.icon}</span>
                  <span className="text-xs font-sans font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex gap-4">
             <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
               Back
             </Button>
            <Button type="submit" className="flex-1">
              Generate <Sparkles size={18} />
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};