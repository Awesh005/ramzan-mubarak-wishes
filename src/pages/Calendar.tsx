import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, MapPin, Loader2, Search, Navigation, Sunrise, Sunset, Clock, Moon } from 'lucide-react';

// Prayer times interface
interface PrayerTimes {
  fajr: string;
  maghrib: string;
}

// Fasting status type
type FastingStatus = 'sehri' | 'fasting' | 'iftar';

// Helper to generate dates (Starting Feb 18, 2026)
const generateCalendarData = () => {
  const startDate = new Date('2026-02-18');
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    return {
      ramadanDay: i + 1,
      gregorianDate: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      dayOfWeek: date.toLocaleDateString('en-GB', { weekday: 'long' }),
      hijriDate: `${i + 1} Ramadan`,
      isToday: new Date().toDateString() === date.toDateString(),
      sehri: "05:12 AM", // Placeholder, will be replaced by API logic if needed
      iftar: "06:24 PM"  // Placeholder
    };
  });
};

const formatTime = (time24: string): string => {
  if (!time24) return '--:--';
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export const CalendarView: React.FC = () => {
  const [locationName, setLocationName] = useState<string>('Detecting...');
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMonthly, setLoadingMonthly] = useState<boolean>(false);
  const [manualInput, setManualInput] = useState<string>('');
  const [isManualMode, setIsManualMode] = useState<boolean>(false);
  
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loadingPrayer, setLoadingPrayer] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [fastingStatus, setFastingStatus] = useState<FastingStatus>('fasting');

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (prayerTimes) {
      const status = calculateFastingStatus(currentTime, prayerTimes.fajr, prayerTimes.maghrib);
      setFastingStatus(status);
    }
  }, [currentTime, prayerTimes]);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetchPrayerTimes(latitude, longitude);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    detectLocation();
  }, []);

  const fetchPrayerTimes = async (lat: number, lon: number) => {
    setLoadingPrayer(true);
    try {
      const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`);
      const data = await response.json();
      if (data?.data?.timings) {
        setPrayerTimes({
          fajr: data.data.timings.Fajr,
          maghrib: data.data.timings.Maghrib
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPrayer(false);
    }
  };

  const calculateFastingStatus = (current: Date, fajr: string, maghrib: string): FastingStatus => {
    const now = current.getHours() * 60 + current.getMinutes();
    const [fH, fM] = fajr.split(':').map(Number);
    const [mH, mM] = maghrib.split(':').map(Number);
    const fTotal = fH * 60 + fM;
    const mTotal = mH * 60 + mM;

    if (now < fTotal) return 'sehri';
    if (now >= fTotal && now < mTotal) return 'fasting';
    return 'iftar';
  };

  const detectLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      setIsManualMode(true);
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          const city = data.address.city || data.address.town || data.address.village || 'Your City';
          setLocationName(city);
          setManualInput(city);
        } catch {
          setIsManualMode(true);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setIsManualMode(true);
        setLoading(false);
      }
    );
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      setLocationName(manualInput);
      setIsManualMode(false);
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(manualInput)}`)
        .then(res => res.json())
        .then(data => {
          if (data?.[0]) {
            setLatitude(parseFloat(data[0].lat));
            setLongitude(parseFloat(data[0].lon));
          }
        });
    }
  };

  const statusConfig = {
    sehri: { message: 'Sehri Time 🌙', gradient: 'from-blue-400 to-indigo-500', bg: 'bg-blue-500/10' },
    fasting: { message: 'You are fasting 🌙', gradient: 'from-gold-300 to-gold-600', bg: 'bg-gold-500/10' },
    iftar: { message: 'Iftar Time! 🌙✨', gradient: 'from-emerald-400 to-teal-500', bg: 'bg-emerald-500/10' }
  }[fastingStatus];

  const calendarData = generateCalendarData();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="w-full max-w-6xl mx-auto px-4 py-12"
    >
      <div className="flex flex-col items-center mb-12">
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center mb-6 border border-gold-500/20 shadow-[0_0_30px_rgba(251,191,36,0.1)]"
        >
          <Moon className="w-10 h-10 text-gold-400" />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-100 to-gold-500 text-center">
          Ramadan Calendar
        </h1>
        <p className="text-emerald-400/40 font-sans mt-4 tracking-[0.3em] uppercase text-xs">1447 AH / 2026 CE</p>
      </div>

      <div className="flex flex-col items-center mb-16">
        <AnimatePresence mode="wait">
          {isManualMode ? (
            <motion.form 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              onSubmit={handleManualSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
            >
              <input 
                type="text" value={manualInput} onChange={(e) => setManualInput(e.target.value)}
                placeholder="Enter city..." className="flex-1 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500/50 transition-all font-sans"
              />
              <button type="submit" className="px-8 py-3 bg-gold-500 text-black rounded-2xl font-bold hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20">Set City</button>
            </motion.form>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onClick={() => setIsManualMode(true)}
              className="px-8 py-3 rounded-full bg-white/5 border border-white/10 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-all group"
            >
              <MapPin className="w-5 h-5 text-gold-500" />
              <span className="text-emerald-50/70 font-sans">Prayer Times: <span className="text-gold-400 font-bold">{locationName}</span></span>
              <span className="text-[10px] text-gold-500/40 uppercase tracking-widest ml-2 opacity-0 group-hover:opacity-100 transition-opacity">Change</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {prayerTimes && (
        <div className="flex flex-col items-center mb-24">
          <div className="flex items-center gap-3 text-2xl font-serif text-emerald-100/60 mb-8 tracking-widest">
            <Clock className="w-6 h-6 text-gold-400" />
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>

          <motion.div 
            key={fastingStatus} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className={`px-12 py-5 rounded-[2rem] ${statusConfig.bg} backdrop-blur-xl border border-white/10 shadow-2xl mb-12`}
          >
            <span className={`text-2xl font-bold bg-gradient-to-r ${statusConfig.gradient} bg-clip-text text-transparent`}>
              {statusConfig.message}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center group hover:border-blue-500/30 transition-all">
              <Sunrise className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <p className="text-xs text-emerald-400/40 uppercase tracking-[0.2em] mb-2 font-bold">Sehri Ends</p>
              <p className="text-3xl font-serif font-bold text-white">{formatTime(prayerTimes.fajr)}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center group hover:border-emerald-500/30 transition-all">
              <Sunset className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
              <p className="text-xs text-emerald-400/40 uppercase tracking-[0.2em] mb-2 font-bold">Iftar Starts</p>
              <p className="text-3xl font-serif font-bold text-white">{formatTime(prayerTimes.maghrib)}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {calendarData.map((day, i) => (
          <motion.div 
            key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className={`relative p-8 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border transition-all duration-500 group overflow-hidden ${
              day.isToday ? 'border-gold-500 shadow-[0_0_40px_rgba(251,191,36,0.1)] scale-105' : 'border-white/10 hover:border-gold-500/30'
            }`}
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-gold-500/5 rounded-full blur-2xl group-hover:bg-gold-500/10 transition-all" />
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-[10px] text-emerald-400/30 uppercase tracking-[0.3em] mb-4 font-bold">Ramadan</span>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center font-serif font-bold text-2xl mb-4 transition-all ${
                day.isToday ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/30' : 'bg-white/5 text-gold-400 border border-gold-500/20'
              }`}>
                {day.ramadanDay}
              </div>
              <p className="text-xl font-serif text-white mb-1">{day.gregorianDate}</p>
              <p className="text-[10px] text-emerald-400/40 uppercase tracking-widest mb-6">{day.dayOfWeek}</p>
              
              <div className="w-full pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-[9px] text-blue-400/40 uppercase font-bold tracking-tighter mb-1">Sehri</p>
                  <p className="text-sm font-sans text-blue-100/70">{day.sehri}</p>
                </div>
                <div className="text-center border-l border-white/5">
                  <p className="text-[9px] text-emerald-400/40 uppercase font-bold tracking-tighter mb-1">Iftar</p>
                  <p className="text-sm font-sans text-emerald-100/70">{day.iftar}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};