import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Navbar } from './components/Navbar';
import { Landing } from './pages/Landing';
import { Generator } from './pages/Generator';
import { WishDisplay } from './pages/WishDisplay';
import { CalendarView } from './pages/Calendar';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/wish" element={<WishDisplay />} />
          <Route path="/calendar" element={<CalendarView />} />
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}