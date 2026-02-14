import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Navbar } from './components/Navbar';
import { Landing } from './views/Landing';
import { Generator } from './views/Generator';
import { WishDisplay } from './views/WishDisplay';
import { CalendarView } from './views/Calendar';
import { WishData, WishStyle } from './types';
import { AnimatePresence } from 'framer-motion';

type ViewState = 'landing' | 'generator' | 'wish' | 'calendar';

export default function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [wishData, setWishData] = useState<WishData | null>(null);

  // Check for URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sender = params.get('sender');
    const receiver = params.get('receiver');
    const styleParam = params.get('style');
    const page = params.get('page');

    if (page === 'calendar') {
      setView('calendar');
    } else if (sender) {
      // Validate style
      let style = WishStyle.CLASSIC;
      if (styleParam && Object.values(WishStyle).includes(styleParam as WishStyle)) {
        style = styleParam as WishStyle;
      }

      setWishData({
        sender,
        receiver: receiver || undefined,
        style
      });
      setView('wish');
    }
  }, []);

  const handleStart = () => setView('generator');

  const handleGenerate = (data: WishData) => {
    setWishData(data);
    setView('wish');
    
    const params = new URLSearchParams();
    params.append('sender', data.sender);
    if (data.receiver) params.append('receiver', data.receiver);
    params.append('style', data.style);
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  };

  const handleHome = () => {
    setWishData(null);
    setView('landing');
    window.history.pushState({}, '', window.location.pathname);
  };

  const handleBackToLanding = () => {
    setView('landing');
  };

  const handleNavigate = (target: 'home' | 'calendar') => {
    if (target === 'calendar') {
      setView('calendar');
      const params = new URLSearchParams(window.location.search);
      // Keep sender data in URL if present, but add page=calendar to allow sharing the calendar view or just bookmarking
      // Actually, cleaner to just set ?page=calendar
      window.history.pushState({}, '', '?page=calendar');
    } else {
      // If we have wish data, go to wish, else landing
      if (wishData) {
        setView('wish');
        // Restore wish URL
        const params = new URLSearchParams();
        params.append('sender', wishData.sender);
        if (wishData.receiver) params.append('receiver', wishData.receiver);
        params.append('style', wishData.style);
        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
      } else {
        setView('landing');
        window.history.pushState({}, '', window.location.pathname);
      }
    }
  };

  // Determine which nav item is active
  const navState = view === 'calendar' ? 'calendar' : 'home';
  // Layout centering: Calendar needs top alignment (scrolling), others need center
  const isLayoutCentered = view !== 'calendar';

  return (
    <Layout isCentered={isLayoutCentered}>
      <Navbar currentView={navState} onNavigate={handleNavigate} />
      
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <Landing key="landing" onStart={handleStart} />
        )}
        
        {view === 'generator' && (
          <Generator 
            key="generator" 
            onGenerate={handleGenerate} 
            onCancel={handleBackToLanding}
          />
        )}
        
        {view === 'wish' && wishData && (
          <WishDisplay 
            key="wish" 
            data={wishData} 
            onHome={handleHome} 
          />
        )}

        {view === 'calendar' && (
          <CalendarView key="calendar" />
        )}
      </AnimatePresence>
    </Layout>
  );
}