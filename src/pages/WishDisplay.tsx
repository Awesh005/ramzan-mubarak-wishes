import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { WishData, WishStyle } from '../types';
import { WISH_TEMPLATES } from '../constants';
import { Button } from '../components/Button';
import { Share2, Copy, Check, MessageCircle, Home, ArrowLeft } from 'lucide-react';
import { getBaseUrl, shareContent, shareToWhatsApp, copyToClipboard } from '../utils/share';
import { SEO } from '../components/SEO';

export const WishDisplay: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  // Read data from URL parameters
  const sender = searchParams.get('sender');
  const receiver = searchParams.get('receiver');
  const styleParam = searchParams.get('style');
  
  // Validate and construct wish data
  let style = WishStyle.CLASSIC;
  if (styleParam && Object.values(WishStyle).includes(styleParam as WishStyle)) {
    style = styleParam as WishStyle;
  }
  
  // Redirect to home if no sender
  useEffect(() => {
    if (!sender) {
      navigate('/');
    }
  }, [sender, navigate]);
  
  if (!sender) return null;
  
  const data: WishData = {
    sender,
    receiver: receiver || undefined,
    style
  };
  
  const template = WISH_TEMPLATES[data.style];
  const message = template.message(data.sender, data.receiver);
  const shareUrl = `${getBaseUrl()}/wish?${searchParams.toString()}`;

  const handleCopy = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    const text = `*${template.title}*\n\n${message}\n\nSee my special wish for you here:`;
    shareToWhatsApp(text, shareUrl);
  };

  const handleNativeShare = async () => {
    const result = await shareContent('Ramzan Mubarak Wish', message, shareUrl);
    if (result.method === 'clipboard') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4">
      <SEO 
        title={`Ramadan Wish from ${sender}`}
        description={`See this special Ramadan message from ${sender}. Ramzan Mubarak to you and your family!`}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="w-full relative"
      >
        {/* Navigation back */}
        <motion.button 
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-emerald-200/60 hover:text-gold-400 transition-colors font-sans uppercase tracking-[0.2em] text-xs"
        >
          <ArrowLeft size={16} /> Home
        </motion.button>

        {/* Card Container */}
        <div className="bg-gradient-to-br from-emerald-950/80 via-black to-emerald-900/80 backdrop-blur-2xl border border-gold-500/20 rounded-[3rem] p-10 md:p-16 text-center shadow-3xl relative overflow-hidden group">
          
          {/* Ornamental Borders - Refined */}
          <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold-500/30 rounded-tl-3xl shadow-[0_0_15px_rgba(251,191,36,0.1)]"></div>
          <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-gold-500/30 rounded-tr-3xl"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-gold-500/30 rounded-bl-3xl"></div>
          <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-gold-500/30 rounded-br-3xl"></div>

          {/* Decorative Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none"></div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <span className="px-6 py-2 bg-gold-500/5 rounded-full border border-gold-500/10 text-gold-400/80 text-xs font-serif uppercase tracking-[0.3em]">
                Ramadan Kareem
              </span>
            </motion.div>

            <motion.h2 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-100 to-gold-600 mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] leading-tight"
            >
              {template.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl md:text-2xl font-sans text-emerald-50/80 leading-relaxed mb-12 italic tracking-wide"
            >
              "{message}"
            </motion.div>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mx-auto mb-10"></div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
             <p className="text-xs font-sans text-emerald-400/40 uppercase tracking-[0.3em] mb-3">With warm blessings from</p>
             <p className="text-3xl font-serif text-gold-400 font-bold drop-shadow-sm">{data.sender}</p>
            </motion.div>
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Button variant="primary" onClick={handleWhatsApp} className="h-14 !px-6 shadow-emerald-500/5">
            <MessageCircle size={18} /> WhatsApp
          </Button>
          
          <Button variant="secondary" onClick={handleNativeShare} className="h-14 bg-white/5 border-gold-500/20 text-emerald-100 hover:bg-white/10 !px-6">
            <Share2 size={18} /> Share
          </Button>
          
          <Button variant="secondary" onClick={handleCopy} className="h-14 bg-white/5 border-gold-500/20 text-emerald-100 hover:bg-white/10 !px-6">
            {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? 'Copied' : 'Copy Link'}
          </Button>

          <Button variant="secondary" onClick={() => navigate('/generator')} className="h-14 bg-white/5 border-gold-500/20 text-emerald-100 hover:bg-white/10 !px-6">
            <Home size={18} /> New Wish
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};