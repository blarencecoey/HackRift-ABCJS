import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Home, Search, Heart, User } from 'lucide-react'; // Icons for bottom nav later
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css'; // Ensure styles are imported
import { useState } from 'react';

// Custom styles for DayPicker to match the design
const calendarStyles = `
  .rdp {
    --rdp-cell-size: 40px;
    --rdp-accent-color: #D69E2E; /* Gold/Bronze color from image for selected date */
    --rdp-background-color: #D69E2E; 
    margin: 0;
  }
  .rdp-day_selected:not([disabled]), .rdp-day_selected:focus:not([disabled]), .rdp-day_selected:active:not([disabled]), .rdp-day_selected:hover:not([disabled]) {
    background-color: #BF905E; /* Approximate bronze/gold */
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
`;

interface HomeDashboardProps {
  userName: string;
  onNavigate: (screen: string) => void;
}

export function HomeDashboard({ userName, onNavigate }: HomeDashboardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2021, 8, 19)); // Sept 19, 2021 from mockup

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
          <span className="text-xs text-gray-500 font-medium">Thu, 19 Sep</span>
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
            <DayPicker
              mode="single"
              required
              selected={selectedDate}
              onSelect={setSelectedDate}
              defaultMonth={new Date(2021, 8)}
              showOutsideDays
              modifiersClassNames={{
                selected: 'my-selected',
                today: 'my-today'
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
          {[
            { title: 'Morning Refresh', time: '08:00 AM', color: '#FFF4E5' },
            { title: 'Focus Time', time: '10:00 AM', color: '#E8F5E9' },
            { title: 'Team Sync', time: '02:00 PM', color: '#E3F2FD' }
          ].map((item, i) => (
            <motion.div
              key={`plan-${i}`}
              className="min-w-[140px] h-[160px] rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between p-5 flex-shrink-0"
              style={{ backgroundColor: '#FFFFFF' }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: item.color }}
              >
                <div className="w-2 h-2 rounded-full bg-gray-400 opacity-50" />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-medium block mb-1">{item.time}</span>
                <h3 className="text-sm font-bold text-gray-700 leading-tight">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Others you might enjoy */}
      <div className="mb-4">
        <div className="px-6 mb-3">
          <h2 className="text-base font-bold text-gray-800">Others you might enjoy</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide">
          {[
            { title: 'Art Therapy', participants: '12 joined', color: '#F3E5F5' },
            { title: 'Yoga Basics', participants: '8 joined', color: '#E0F2F1' },
            { title: 'Music Jam', participants: '24 joined', color: '#FFF3E0' }
          ].map((item, i) => (
            <motion.div
              key={`other-${i}`}
              className="min-w-[140px] h-[160px] rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between p-5 flex-shrink-0"
              style={{ backgroundColor: '#FFFFFF' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex justify-end">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: item.color }}
                >
                  <Heart size={14} className="text-gray-400" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-1">{item.title}</h3>
                <span className="text-xs text-gray-400">{item.participants}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
