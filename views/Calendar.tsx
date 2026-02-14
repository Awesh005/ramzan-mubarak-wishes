import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, MapPin, Loader2, Search, Navigation, Sunrise, Sunset, Clock } from 'lucide-react';
import { Button } from '../components/Button';

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
      hijriDate: `${i + 1} Ramadan`
    };
  });
};

// Helper to format time from 24h to 12h format
const formatTime = (time24: string): string => {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Helper to compare times (returns true if current is between start and end)
const isTimeBetween = (current: Date, startTime: string, endTime: string): boolean => {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  
  const currentMinutes = current.getHours() * 60 + current.getMinutes();
  const startMinutesTotal = startHours * 60 + startMinutes;
  const endMinutesTotal = endHours * 60 + endMinutes;
  
  return currentMinutes >= startMinutesTotal && currentMinutes < endMinutesTotal;
};

const calendarData = generateCalendarData();

export const CalendarView: React.FC = () => {
  const [locationName, setLocationName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [manualInput, setManualInput] = useState<string>('');
  const [isManualMode, setIsManualMode] = useState<boolean>(false);
  
  // Prayer times state
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loadingPrayer, setLoadingPrayer] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  
  // Live clock state
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [fastingStatus, setFastingStatus] = useState<FastingStatus>('fasting');

  // Live clock - updates every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(interval); // Cleanup
  }, []);

  // Calculate fasting status whenever time or prayer times change
  useEffect(() => {
    if (prayerTimes) {
      const status = calculateFastingStatus(currentTime, prayerTimes.fajr, prayerTimes.maghrib);
      setFastingStatus(status);
    }
  }, [currentTime, prayerTimes]);

  // Fetch prayer times when location coordinates are available
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
      const response = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`
      );
      const data = await response.json();
      
      if (data && data.data && data.data.timings) {
        setPrayerTimes({
          fajr: data.data.timings.Fajr,
          maghrib: data.data.timings.Maghrib
        });
      }
    } catch (error) {
      console.error("Prayer times fetch failed", error);
    } finally {
      setLoadingPrayer(false);
    }
  };

  const calculateFastingStatus = (current: Date, fajrTime: string, maghribTime: string): FastingStatus => {
    const currentHours = current.getHours();
    const currentMinutes = current.getMinutes();
    const currentTimeStr = `${currentHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;
    
    const [fajrHours, fajrMinutes] = fajrTime.split(':').map(Number);
    const [maghribHours, maghribMinutes] = maghribTime.split(':').map(Number);
    
    const currentTotalMinutes = currentHours * 60 + currentMinutes;
    const fajrTotalMinutes = fajrHours * 60 + fajrMinutes;
    const maghribTotalMinutes = maghribHours * 60 + maghribMinutes;
    
    if (currentTotalMinutes < fajrTotalMinutes) {
      return 'sehri';
    } else if (currentTotalMinutes >= fajrTotalMinutes && currentTotalMinutes < maghribTotalMinutes) {
      return 'fasting';
    } else {
      return 'iftar';
    }
  };

  const detectLocation = () => {
    setLoading(true);
    setIsManualMode(false);
    
    if (!('geolocation' in navigator)) {
      setIsManualMode(true);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          if (data && data.address) {
            const city = data.address.city || 
                        data.address.town || 
                        data.address.village || 
                        data.address.municipality ||
                        data.address.county ||
                        'Your Location';
            const country = data.address.country || '';
            const formattedLocation = country ? `${city}, ${country}` : city;
            setLocationName(formattedLocation);
            setManualInput(formattedLocation);
            setIsManualMode(false);
          } else {
             setIsManualMode(true);
          }
        } catch (error) {
          console.error("Location lookup failed", error);
          setIsManualMode(true);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error", error);
        setIsManualMode(true);
        setLoading(false);
      }
    );
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      setLocationName(manualInput);
      setIsManualMode(false);
      
      // Geocode the city name to get coordinates
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(manualInput)}`
        );
        const data = await response.json();
        
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          setLatitude(lat);
          setLongitude(lon);
        }
      } catch (error) {
        console.error("Geocoding failed", error);
      }
    }
  };

  const getFastingStatusConfig = () => {
    switch (fastingStatus) {
      case 'sehri':
        return {
          message: 'Sehri Time 🌙',
          gradient: 'from-blue-500 to-purple-500',
          bgGradient: 'from-blue-500/20 to-purple-500/20'
        };
      case 'fasting':
        return {
          message: 'You are fasting 🌙',
          gradient: 'from-gold-400 to-gold-600',
          bgGradient: 'from-gold-500/20 to-gold-600/20'
        };
      case 'iftar':
        return {
          message: 'Iftar Time! 🌙✨',
          gradient: 'from-emerald-500 to-teal-500',
          bgGradient: 'from-emerald-500/20 to-teal-500/20'
        };
    }
  };

  const statusConfig = getFastingStatusConfig();

  return (
    <div className="w-full max-w-6xl mx-auto pt-24 pb-10 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <Moon className="w-8 h-8 text-gold-400" />
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300">
            Ramadan Calendar
          </h1>
        </div>
        <p className="text-emerald-200/60 font-sans mb-6">1447 AH / 2026 CE</p>

        {/* Location Section */}
        <div className="flex flex-col items-center justify-center min-h-[60px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-gold-400 font-sans"
              >
                <Loader2 className="animate-spin" size={20} />
                <span>Detecting location...</span>
              </motion.div>
            ) : isManualMode ? (
              <motion.form 
                key="manual"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onSubmit={handleManualSubmit}
                className="flex gap-2 w-full max-w-md"
              >
                <input
                  type="text"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  placeholder="Enter city name (e.g. Dubai)"
                  className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-emerald-500/30 focus:border-gold-500 text-white placeholder-emerald-500/50 outline-none font-sans"
                />
                <button 
                  type="submit"
                  className="bg-gold-500 hover:bg-gold-400 text-black p-2 rounded-xl transition-colors"
                >
                  <Search size={20} />
                </button>
                <button
                  type="button"
                  onClick={detectLocation}
                  className="bg-emerald-800/50 hover:bg-emerald-700/50 text-emerald-200 p-2 rounded-xl border border-emerald-500/30 transition-colors"
                  title="Use GPS"
                >
                  <Navigation size={20} />
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="location"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 bg-emerald-950/40 backdrop-blur-md px-6 py-2 rounded-full border border-gold-500/20 shadow-lg group cursor-pointer hover:border-gold-500/40 transition-all"
                onClick={() => setIsManualMode(true)}
              >
                <MapPin className="text-gold-500" size={18} />
                <span className="text-emerald-100 font-sans">
                  Prayer Times for: <span className="font-semibold text-gold-300">{locationName}</span>
                </span>
                <span className="text-xs text-emerald-500 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  (Change)
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Prayer Times & Live Clock Section */}
      <AnimatePresence>
        {prayerTimes && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-12"
          >
            {/* Live Clock & Fasting Status */}
            <div className="flex flex-col items-center gap-4 mb-8">
              {/* Live Clock */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 text-2xl font-serif text-gold-300"
              >
                <Clock className="w-6 h-6" />
                <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
              </motion.div>

              {/* Fasting Status Badge */}
              <motion.div
                key={fastingStatus}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`px-8 py-3 rounded-full bg-gradient-to-r ${statusConfig.bgGradient} backdrop-blur-md border border-white/20 shadow-lg`}
              >
                <span className={`text-lg font-semibold bg-gradient-to-r ${statusConfig.gradient} bg-clip-text text-transparent`}>
                  {statusConfig.message}
                </span>
              </motion.div>
            </div>

            {/* Prayer Times Cards */}
            {loadingPrayer ? (
              <div className="flex items-center justify-center gap-2 text-gold-400 font-sans py-8">
                <Loader2 className="animate-spin" size={20} />
                <span>Fetching prayer times...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {/* Sehri Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative group bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-blue-500/30 rounded-2xl p-6 overflow-hidden hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300"
                >
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all" />
                  
                  <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                    <Sunrise className="w-10 h-10 text-blue-400" />
                    <h3 className="text-lg font-sans text-blue-200/80">Sehri ends at</h3>
                    <p className="text-3xl font-serif font-bold text-white">
                      {formatTime(prayerTimes.fajr)}
                    </p>
                    <div className="w-16 h-0.5 bg-blue-500/50 mt-2" />
                  </div>
                </motion.div>

                {/* Iftar Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative group bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-6 overflow-hidden hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300"
                >
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-all" />
                  
                  <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                    <Sunset className="w-10 h-10 text-emerald-400" />
                    <h3 className="text-lg font-sans text-emerald-200/80">Iftar starts at</h3>
                    <p className="text-3xl font-serif font-bold text-white">
                      {formatTime(prayerTimes.maghrib)}
                    </p>
                    <div className="w-16 h-0.5 bg-emerald-500/50 mt-2" />
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05
            }
          }
        }}
      >
        {calendarData.map((day) => (
          <motion.div
            key={day.ramadanDay}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 }
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 overflow-hidden hover:border-gold-500/50 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)] transition-all duration-300"
          >
            {/* Background Decoration */}
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-gold-500/10 rounded-full blur-xl group-hover:bg-gold-500/20 transition-all" />
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-2">
              <span className="text-xs font-sans text-emerald-400/60 uppercase tracking-widest">
                Ramadan
              </span>
              
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-black font-serif font-bold text-xl shadow-lg">
                {day.ramadanDay}
              </div>
              
              <div className="mt-2">
                <p className="text-lg font-serif text-white">{day.gregorianDate}</p>
                <p className="text-sm font-sans text-emerald-200/60">{day.dayOfWeek}</p>
              </div>
              
              {/* Optional Decoration Line */}
              <div className="w-8 h-0.5 bg-white/10 mt-2 group-hover:bg-gold-500/50 transition-colors" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 text-center">
        <p className="text-xs text-emerald-500/40 font-sans italic">
          * Dates are subject to moon sighting.
        </p>
      </div>
    </div>
  );
};