import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, RefreshCw, Smile, Meh, Frown, ThumbsUp, Heart } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

// Custom styles for the calendar to match the "Mood Tracker" look
const trackerStyles = `
  .rdp {
    --rdp-cell-size: 35px;
    margin: 0;
    position: relative;
    z-index: 0;
  }
  .rdp-caption_label {
    font-size: 0.9rem;
    color: #4A5568;
    font-weight: 700;
  }
  .rdp-head_cell {
    font-size: 0.7rem;
    font-weight: 600;
    color: #A0AEC0;
  }
  .rdp-day {
    color: #4A5568;
    font-size: 0.8rem;
  }
  .rdp-nav_button {
    color: #A0AEC0;
    width: 24px;
    height: 24px;
  }
`;

interface ReflectionPageProps {
    onNavigate: (screen: string) => void;
}

const moods = [
    { id: 'amazing', label: 'Amazing', icon: '😁', color: '#FDE68A' }, // Emtpy bg with emoji
    { id: 'happy', label: 'Happy', icon: '🙂', color: '#A7F3D0' },
    { id: 'okay', label: 'Okay', icon: '😐', color: '#E2E8F0' },
    { id: 'anxious', label: 'Anxious', icon: '😓', color: '#E9D8FD' },
    { id: 'sad', label: 'Sad', icon: '☹️', color: '#FED7D7' },
];

export function ReflectionPage({ onNavigate }: ReflectionPageProps) {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [reflection, setReflection] = useState('');

    // Mock data for mood tracker
    const moodHistory: Record<string, string> = {
        '2025-12-01': 'happy',
        '2025-12-02': 'amazing',
        '2025-12-03': 'okay',
        '2025-12-04': 'sad',
        '2025-12-05': 'anxious',
        '2025-12-08': 'happy',
        // ... populate with some data
    };

    const getMoodForDate = (date: Date) => {
        const key = date.toISOString().split('T')[0];
        return moodHistory[key];
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] p-6 pb-32">
            <style>{trackerStyles}</style>

            {/* Header */}
            <div className="mb-6 pt-4">
                <h1 className="text-6xl font-bold text-center text-gray-800">How am I feeling today?</h1>
            </div>

            {/* Mood Check-in Card */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-[#FFFFFF] rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] mb-6"
                style={{ backgroundColor: '#FFFFFF' }}
            >
                <h2 className="text-gray-600 mb-4 font-medium">Mood Check-in</h2>
                <div className="flex justify-between">
                    {moods.map((m) => (
                        <div key={m.id} className="flex flex-col items-center gap-2">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedMood(m.id)}
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 ${selectedMood === m.id ? 'ring-2 ring-offset-2 ring-[#c1934d] shadow-md' : ''
                                    }`}
                                style={{ backgroundColor: m.color }}
                            >
                                {m.icon}
                            </motion.button>
                            <span className="text-[10px] font-medium text-gray-400">{m.label}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Daily Reflection Card */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-[#FFFFFF] rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] mb-6"
                style={{ backgroundColor: '#FFFFFF' }}
            >
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-gray-600 font-medium">Daily Reflection</h2>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <RefreshCw size={18} />
                    </button>
                </div>

                <p className="text-sm text-gray-400 mb-3">What made you smile today?</p>

                <textarea
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    placeholder="Write your thoughts......"
                    className="w-full h-32 bg-[#F3F0E9] rounded-2xl p-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#c1934d] resize-none"
                />
            </motion.div>

            {/* Mood Tracker Card */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-[#FFFFFF] rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
                style={{ backgroundColor: '#FFFFFF' }}
            >
                <h2 className="text-gray-600 font-medium mb-4">My Mood Tracker</h2>

                <div className="flex justify-center">
                    <DayPicker
                        mode="single"
                        modifiers={{
                            hasMood: (date) => !!getMoodForDate(date)
                        }}
                        components={{
                            DayContent: (props) => {
                                const moodId = getMoodForDate(props.date);
                                const mood = moods.find(m => m.id === moodId);

                                if (mood) {
                                    return (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
                                                style={{ backgroundColor: mood.color }}
                                            >
                                                {mood.icon}
                                            </div>
                                        </div>
                                    );
                                }
                                return props.date.getDate();
                            }
                        }}
                    />
                </div>
            </motion.div>
        </div>
    );
}
