import React from 'react';
import { Lantern } from './Lantern';
import { Star } from './Star';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Calendar needs top alignment (scrolling), others need center
  const isCentered = location.pathname !== '/calendar';
  
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden 
                    bg-gradient-to-b from-[#0a0e0d] via-black to-[#0a0e0d]
                    transition-colors duration-500">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 fixed" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FBBF24' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
           }} 
      />
      
      {/* Decorative Elements */}
      <div className="fixed top-0 w-full flex justify-between px-4 sm:px-20 pointer-events-none z-0">
        <Lantern delay={0.2} className="left-[10%] h-[30vh] animate-float-slow" />
        <Lantern delay={0.5} className="right-[15%] h-[40vh] scale-75 animate-float" />
        <Lantern delay={0.8} className="left-[40%] h-[20vh] scale-50 hidden md:block animate-float-slow" />
      </div>

      {/* Enhanced Star Field */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Star className="top-20 left-10" delay={0} size={3} />
        <Star className="top-40 right-20" delay={1.5} size={4} />
        <Star className="bottom-40 left-1/4" delay={0.8} size={2} />
        <Star className="top-1/3 right-1/3" delay={2.2} size={3} />
        <Star className="top-60 left-1/2" delay={1.2} size={2} />
        <Star className="bottom-20 right-1/4" delay={1.8} size={3} />
      </div>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex flex-col">
        <div className={`flex-grow flex flex-col px-4 py-20 ${isCentered ? 'items-center justify-center' : 'items-start justify-start'}`}>
          {children}
        </div>

        {/* Footer */}
        <footer className="w-full text-center py-6 
                          text-emerald-400/60
                          font-sans text-sm relative z-20 mt-auto">
          <p className="flex items-center justify-center gap-2">
            Made with <span className="text-red-500 animate-pulse">❤️</span> for Ramadan 2026
          </p>
        </footer>
      </main>
    </div>
  );
};