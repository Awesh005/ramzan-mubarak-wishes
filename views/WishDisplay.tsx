import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { WishData } from '../types';
import { WISH_TEMPLATES } from '../constants';
import { Button } from '../components/Button';
import { Share2, Copy, Check, MessageCircle, Home } from 'lucide-react';

interface WishDisplayProps {
  data: WishData;
  onHome: () => void;
}

export const WishDisplay: React.FC<WishDisplayProps> = ({ data, onHome }) => {
  const [copied, setCopied] = useState(false);
  const template = WISH_TEMPLATES[data.style];
  const message = template.message(data.sender, data.receiver);
  
  // Construct the share URL
  const getShareUrl = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    params.append('sender', data.sender);
    if (data.receiver) params.append('receiver', data.receiver);
    params.append('style', data.style);
    return `${baseUrl}?${params.toString()}`;
  };

  const shareUrl = getShareUrl();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`*${template.title}*\n\n${message}\n\nSee my special wish for you here:\n${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ramzan Mubarak Wish',
          text: message,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 1 }}
        className="w-full relative"
      >
        {/* Card Container */}
        <div className="bg-gradient-to-br from-emerald-950/80 via-black/80 to-emerald-900/80 backdrop-blur-xl border border-gold-500/30 rounded-[2rem] p-8 md:p-12 text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          
          {/* Ornamental Borders */}
          <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-gold-500/50 rounded-tl-2xl"></div>
          <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-gold-500/50 rounded-tr-2xl"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-gold-500/50 rounded-bl-2xl"></div>
          <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-gold-500/50 rounded-br-2xl"></div>

          {/* Decorative Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-1 bg-gold-500/10 rounded-full border border-gold-500/20 text-gold-400 text-xs font-serif uppercase tracking-widest">
                Ramadan Kareem
              </span>
            </motion.div>

            <motion.h2 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-300 to-gold-600 mb-8 drop-shadow-sm"
            >
              {template.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-lg md:text-xl font-sans text-emerald-50 leading-loose mb-10 italic"
            >
              "{message}"
            </motion.div>

            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-8 opacity-50"></div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
             <p className="text-sm font-sans text-emerald-400/60 uppercase tracking-widest mb-2">Sent By</p>
             <p className="text-2xl font-serif text-gold-400 font-semibold">{data.sender}</p>
            </motion.div>
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-8 grid grid-cols-2 gap-3"
        >
          <Button variant="primary" onClick={handleWhatsApp} className="w-full text-sm !px-4">
            <MessageCircle size={18} /> WhatsApp
          </Button>
          
          <Button variant="secondary" onClick={handleNativeShare} className="w-full text-sm !px-4">
            <Share2 size={18} /> Share
          </Button>
          
          <Button variant="outline" onClick={handleCopy} className="w-full text-sm !px-4">
            {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? 'Copied' : 'Copy Link'}
          </Button>

          <Button variant="outline" onClick={onHome} className="w-full text-sm !px-4">
            <Home size={18} /> Create New
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};