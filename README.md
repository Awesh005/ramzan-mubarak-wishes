# 🌙 Ramzan Mubarak 2026 - Premium Web App

A sophisticated, mobile-first Ramadan web application designed with a premium **"Antigravity" Modern UI**. Share personalized wishes, track the Ramadan calendar, and stay updated with live prayer times.

![Ramzan Mubarak](https://img.shields.io/badge/Ramzan-2026-gold?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)

## ✨ Features

### 🕌 Professional Ramadan Calendar
- **30-Day Grid**: Elegant layout showing Ramadan days alongside Gregorian dates.
- **Dynamic Status**: Real-time status indicator (Sehri time, Fasting, Iftar time).
- **Responsive Design**: Fluid grid that adapts from 1 column on mobile to 4 columns on large screens.

### 📍 Live Prayer Times
- **Location Detection**: Automatic geolocation detection with manual city search fallback.
- **Visual Timings**: Dedicated, glowing cards for Sehri (Fajr) and Iftar (Maghrib).
- **Live Clock**: Synchronized clock for precise timing.

### ✍️ Personalized Wish Generator
- **Multiple Styles**: Choose from Classic, Modern, Urdu, or Emotional writing styles.
- **Deep Linking**: Generate unique URLs that encode your personalized wish for perfect sharing.
- **Beautiful Wish Cards**: High-end glassmorphic wish displays with ornamental Arabic-inspired decorations.

### 📲 One-Click Sharing
- **Web Share API**: Native sharing on mobile devices.
- **WhatsApp Integration**: Single-button share to WhatsApp with pre-formatted text.
- **Clipboard Fallback**: Quick copy link functionality for universal sharing.

## 🎨 Design Philosophy: "Antigravity UI"
The app uses a premium **Dark Theme** consolidation designed to evoke a spiritual and modern atmosphere:
- **Glassmorphism**: High-blur backdrops for that futuristic, premium feel.
- **Staggered Animations**: Smooth entrance effects powered by Framer Motion.
- **Golden Accents**: Carefully curated gold gradients representing the blessed month.
- **Floating Elements**: Animated lanterns and a star field that creates depth.

## 🛠️ Tech Stack
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router 6](https://reactrouter.com/)
- **APIs**: [Aladhan Prayer API](https://aladhan.com/prayer-times-api) & [Nominatim Geocoding](https://nominatim.org/)

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Awesh005/ramzan-mubarak-wishes.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production
```bash
npm run build
```
The build artifacts will be in the `dist/` folder, ready for deployment to Vercel, Netlify, or any static host.

## 🌐 Deployment
This project is optimized for **Vercel**. 
- Simply push to GitHub and connect your repository to Vercel.
- The `vercel.json` ensures that SPA routing (React Router) works perfectly after deployment.

---

**Made with ❤️ for the blessed month of Ramadan 2026.**
