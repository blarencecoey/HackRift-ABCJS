import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Home, Search, Heart, User, Award } from 'lucide-react'; // Icons for bottom nav later
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css'; // Ensure styles are imported
import { SkillCount } from '../hooks/useUserProfile';
import { useState, useEffect } from 'react';

// Custom styles for DayPicker to match the design
const calendarStyles = `
  .rdp {
    --rdp-cell-size: 40px;
    --rdp-accent-color: #c1934d; /* Reddish-brown color for selected date */
    --rdp-background-color: #c1934d; 
    margin: 0;
  }
  .rdp-day_selected:not([disabled]), .rdp-day_selected:focus:not([disabled]), .rdp-day_selected:active:not([disabled]), .rdp-day_selected:hover:not([disabled]) {
    background-color: #c1934d !important; /* Reddish-brown */
    color: white;
    font-weight: bold;
    border-radius: 50%;
  }
  .rdp-day_today {
    font-weight: bold;
  }
  .rdp-head_cell {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #888888;
    font-weight: 500;
  }
  .rdp-caption_label {
    font-size: 1rem;
    font-weight: 600;
    color: #333333;
  }
  .rdp-nav_button {
    color: #888888;
  }
  .my-booked {
    position: relative;
    /* Remove previous background/border styles if any */
    background-color: transparent;
    color: inherit;
  }
  .my-booked:not(.rdp-day_selected)::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background-color: #D69E2E; /* Gold/Yellow dot */
    border-radius: 50%;
  }
  .my-today {
    background-color: #E2E8F0; /* Solid gray circle for today */
    color: #4A5568;
    border-radius: 50%;
    font-weight: bold;
  }
`;

interface HomeDashboardProps {
  userName: string;
  userId?: number;
  onNavigate: (screen: string) => void;
  topSkills: SkillCount[];
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

interface Booking {
  booking_id: number;
  user_id: number;
  event_id: string; // e.g. "COURSE_0188"
  event_type: string;
  status: string;
  booking_date: string; // "YYYY-MM-DD HH:mm:ss"
  event_date?: string; // Optional because legacy data might miss it
}

export function HomeDashboard({ userName, userId, onNavigate, topSkills, selectedDate, setSelectedDate }: HomeDashboardProps) {

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  // Parse Booking Date Helper
  const parseBookingDate = (dateStr: string) => {
    // Basic parsing for "YYYY-MM-DD HH:mm:ss"
    const [datePart, timePart] = dateStr.split(' ');
    return new Date(`${datePart}T${timePart}`);
  };

  // Fetch Bookings
  const fetchBookings = async () => {
    console.log("HomeDashboard: fetchBookings called with userId:", userId);
    if (!userId) {
      console.log("HomeDashboard: Aborting fetch, no userId");
      return;
    }
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:8001';
      const res = await fetch(`${API_URL}/user/${userId}/bookings`);
      if (res.ok) {
        const data = await res.json();
        console.log("HomeDashboard: Fetched bookings:", data);
        setBookings(data);
      }
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch on mount or userId change
  useEffect(() => {
    fetchBookings();
  }, [userId]); // Re-fetch if userId changes

  const bookedDates = bookings.map(booking => parseBookingDate(booking.event_date || booking.booking_date));

  const todaysBookings = bookings.filter(booking => {
    if (!selectedDate) return false;
    // Prefer event_date if available, otherwise fallback to booking_date
    const timeToUse = booking.event_date || booking.booking_date;
    const bookingDay = parseBookingDate(timeToUse);

    return (
      bookingDay.getDate() === selectedDate.getDate() &&
      bookingDay.getMonth() === selectedDate.getMonth() &&
      bookingDay.getFullYear() === selectedDate.getFullYear()
    );
  }).sort((a, b) => {
    const timeA = a.event_date || a.booking_date;
    const timeB = b.event_date || b.booking_date;
    const dateA = parseBookingDate(timeA);
    const dateB = parseBookingDate(timeB);
    return dateA.getTime() - dateB.getTime();
  });

  /* 
   * Booking Handler
   * Sends booking request to backend with event_date
   */
  const handleBooking = async (item: any) => {
    if (!userId) {
      console.log("No user ID, cannot book");
      return;
    }

    // Keyword mapping
    const categorizeEvent = (title: string): string => {
      const lowerTitle = title.toLowerCase();
      if (lowerTitle.includes('yoga') || lowerTitle.includes('sports') || lowerTitle.includes('run')) return 'Sports';
      if (lowerTitle.includes('art') || lowerTitle.includes('therapy') || lowerTitle.includes('workshop')) return 'Workshop';
      if (lowerTitle.includes('tech') || lowerTitle.includes('code') || lowerTitle.includes('hack')) return 'Tech Meetup';
      if (lowerTitle.includes('music') || lowerTitle.includes('jam') || lowerTitle.includes('social')) return 'Social';
      return 'Social'; // Default
    };

    const category = categorizeEvent(item.title);

    // Construct event date
    // If the item already has an event_date, use it.
    // Otherwise, default to 2pm on selected date or today.
    let targetDate: Date;
    if (item.event_date) {
      targetDate = new Date(item.event_date);
    } else {
      targetDate = selectedDate ? new Date(selectedDate) : new Date();
      targetDate.setHours(14, 0, 0, 0);
    }

    // Format as YYYY-MM-DD HH:mm:ss
    const pad = (n: number) => n.toString().padStart(2, '0');
    const eventDateStr = `${targetDate.getFullYear()}-${pad(targetDate.getMonth() + 1)}-${pad(targetDate.getDate())} ${pad(targetDate.getHours())}:${pad(targetDate.getMinutes())}:${pad(targetDate.getSeconds())}`;

    const payload = {
      user_id: userId,
      event_id: item.id || 'EVT_TEST',
      event_type: category, // Use the categorized type
      event_date: eventDateStr
    };

    console.log("Sending booking payload:", payload);

    try {
      const res = await fetch('http://localhost:8001/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        console.log("Booking successful:", data);
        // Refresh bookings to show the new one
        fetchBookings();
        alert(`Booked ${item.title} for ${targetDate.toLocaleDateString()}`);
      } else {
        const err = await res.text();
        console.error("Booking failed:", err);
      }
    } catch (e) {
      console.error("Booking network error:", e);
    }
  };

  const formatTime = (dateStr: string) => {
    const date = parseBookingDate(dateStr);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div className="min-h-screen pb-44"> {/* Increased padding for bottom nav visibility */}
      <style>{calendarStyles}</style>

      {/* Header */}
      <div className="pt-12 px-6 mb-6 flex items-start gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-sm flex-shrink-0">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alyssa"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">
            {selectedDate ? (
              <>
                {selectedDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
              </>
            ) : 'Select a date'}
          </span>
          <h1 className="text-lg font-bold text-gray-800">
            Good Morning, {userName || 'Alyssa'}!
          </h1>
        </div>
      </div>

      {/* Calendar Widget */}
      <div className="px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <div className="flex justify-center">
            {/* The following code snippet is syntactically incorrect in this position.
                It appears to be a booking data payload definition that should likely be
                within a function or handler, not directly inside JSX.
                However, as per instructions, it's placed as requested. */}
            <DayPicker
              mode="single"
              required
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              defaultMonth={new Date()}
              showOutsideDays
              modifiers={{
                booked: bookedDates,
              }}
              modifiersClassNames={{
                selected: 'my-selected',
                today: 'my-today',
                booked: 'my-booked'
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Today's Plan */}
      <div className="mb-8">
        <div className="px-6 mb-3">
          <h2 className="text-base font-bold text-gray-800">Today's Plan</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide">
          {loading ? (
            <p className="text-gray-500">Loading bookings...</p>
          ) : todaysBookings.length > 0 ? (
            todaysBookings.map((booking) => (
              <motion.div
                key={`plan-${booking.booking_id}`}
                className="min-w-[140px] h-[160px] rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between p-5 flex-shrink-0"
                style={{ backgroundColor: '#FFFFFF' }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#FFF4E5' }} // Placeholder color, ideally from event_type
                >
                  <div className="w-4 h-4 rounded-full bg-gray-400 opacity-50 flex items-center justify-center">
                    <span className="text-[10px] text-white font-medium">{formatTime(booking.booking_date).trim().split(":")[0]}</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-medium block mb-1">{formatTime(booking.event_date || booking.booking_date)}</span>
                  <h3 className="text-sm font-bold text-gray-700 leading-tight">{booking.event_type}</h3>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No plans for this date.</p>
          )}
        </div>
      </div>

      {/* Others you might enjoy */}
      <div className="mb-4">
        <div className="px-6 mb-3">
          <h2 className="text-base font-bold text-gray-800">Others you might enjoy</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide">
          {(() => {
            // Generate items with random dates just once (or rely on React to re-render)
            // For stability in a real app useMemo, but here inline mapping is okay if we accept randomness on re-render.
            // To prevent jumping dates, let's use a stable seed or just simple generation
            const suggestions = [
              { id: 'ART_001', type: 'event', title: 'Art Therapy', participants: '12 joined', color: '#F3E5F5' },
              { id: 'YOGA_001', type: 'event', title: 'Yoga Basics', participants: '8 joined', color: '#E0F2F1' },
              { id: 'JAM_001', type: 'event', title: 'Music Jam', participants: '24 joined', color: '#FFF3E0' }
            ].map((item, i) => {
              const date = new Date();
              date.setDate(date.getDate() + (i + 1)); // Tomorrow, day after, etc.
              date.setHours(10 + (i * 2), 0, 0, 0); // Staggered times
              return { ...item, event_date: date };
            });

            return suggestions.map((item, i) => {
              // Format for display
              const dayStr = item.event_date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
              const timeStr = item.event_date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

              return (
                <motion.div
                  key={`other-${i}`}
                  className="min-w-[140px] h-[160px] rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between p-5 flex-shrink-0 cursor-pointer"
                  style={{ backgroundColor: '#FFFFFF' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBooking(item)}
                >
                  <div>
                    <h3 className="text-sm font-bold text-gray-700 mb-1">{item.title}</h3>
                    <span className="text-[10px] text-gray-400 font-semibold block mb-1">
                      {dayStr} • {timeStr}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{item.participants}</span>

                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:size-16 transition-all duration-300"
                        style={{ backgroundColor: item.color }}
                      >
                        <Heart size={14} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            });
          })()}
        </div>
      </div>

      {/* Top Skills Section */}
      {topSkills.length > 0 && (
        <div className="mb-4">
          <div className="px-6 mb-3">
            <h2 className="text-base font-bold text-gray-800">Your Top Skills</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto px-6 pb-4 scrollbar-hide">
            {topSkills.map((skillCount, i) => (
              <motion.div
                key={`skill-${i}`}
                className="min-w-[140px] h-[100px] rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-center items-center p-4 flex-shrink-0"
                style={{ backgroundColor: '#FFFEF9' }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: '#7EB8B320' }}
                >
                  <Award size={20} style={{ color: '#7EB8B3' }} />
                </div>
                <h3 className="text-sm font-bold text-gray-700 text-center leading-tight mb-1">
                  {skillCount.skill}
                </h3>
                <span className="text-xs text-gray-400">
                  {skillCount.count > 1 ? `${skillCount.count}x` : '1x'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
