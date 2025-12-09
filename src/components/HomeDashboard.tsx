import { motion } from 'motion/react';
import { Sparkles, Users, BookOpen, Compass, Heart, Smile, Meh, Frown, Star } from 'lucide-react';
import { useState } from 'react';

interface HomeDashboardProps {
  userName: string;
  onNavigate: (screen: string) => void;
}

export function HomeDashboard({ userName, onNavigate }: HomeDashboardProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [reflection, setReflection] = useState('');

  const moods = [
    { icon: Star, label: 'Amazing', color: '#7EB8B3' },
    { icon: Smile, label: 'Good', color: '#7A9A8B' },
    { icon: Meh, label: 'Okay', color: '#F2C4B3' },
    { icon: Frown, label: 'Low', color: '#9CA3AF' },
  ];

  const communities = [
    { name: 'Tech Creatives', match: 92, members: 234, color: '#7EB8B3' },
    { name: 'Mindful Makers', match: 88, members: 156, color: '#F2C4B3' },
    { name: 'Career Explorers', match: 85, members: 189, color: '#7A9A8B' },
  ];

  return (
    <div className="min-h-screen px-6 pt-12 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="mb-2" style={{ color: '#4A5568' }}>
          Good morning, {userName}
        </h1>
        <p style={{ color: '#9CA3AF', fontSize: '14px' }}>
          How are you feeling today?
        </p>
      </motion.div>

      {/* Mood Check-in */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-6 p-6 rounded-3xl"
        style={{
          backgroundColor: '#FFFEF9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Heart size={20} style={{ color: '#F2C4B3' }} />
          <span style={{ color: '#4A5568' }}>Mood Check-in</span>
        </div>
        <div className="flex gap-3 justify-between">
          {moods.map((mood, index) => (
            <motion.button
              key={mood.label}
              onClick={() => setSelectedMood(mood.label)}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300"
              style={{
                backgroundColor: selectedMood === mood.label ? mood.color + '15' : 'transparent',
                border: selectedMood === mood.label ? `2px solid ${mood.color}` : '2px solid transparent'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: '#F5F0EB',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                <mood.icon size={24} style={{ color: mood.color }} />
              </div>
              <span className="text-xs" style={{ color: '#9CA3AF' }}>{mood.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Insights Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-6 p-6 rounded-3xl cursor-pointer"
        style={{
          backgroundColor: '#FFFEF9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
        }}
        onClick={() => onNavigate('results')}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={20} style={{ color: '#7EB8B3' }} />
              <span style={{ color: '#4A5568' }}>Your Insights</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span 
                className="px-3 py-1 rounded-full text-xs"
                style={{ backgroundColor: '#7EB8B3' + '20', color: '#7EB8B3' }}
              >
                Creative
              </span>
              <span 
                className="px-3 py-1 rounded-full text-xs"
                style={{ backgroundColor: '#F2C4B3' + '20', color: '#7A9A8B' }}
              >
                Empathetic
              </span>
              <span 
                className="px-3 py-1 rounded-full text-xs"
                style={{ backgroundColor: '#7A9A8B' + '20', color: '#7A9A8B' }}
              >
                Curious
              </span>
            </div>
            <p className="text-sm" style={{ color: '#9CA3AF' }}>
              You&apos;re 73% complete on your journey
            </p>
          </div>
          <div className="relative w-20 h-20 ml-4">
            <svg className="transform -rotate-90" width="80" height="80">
              <circle
                cx="40"
                cy="40"
                r="34"
                stroke="#F5F0EB"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r="34"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - 0.73)}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7EB8B3" />
                  <stop offset="100%" stopColor="#F2C4B3" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span style={{ color: '#4A5568' }}>73%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Communities Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-6 p-6 rounded-3xl"
        style={{
          backgroundColor: '#FFFEF9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users size={20} style={{ color: '#7EB8B3' }} />
            <span style={{ color: '#4A5568' }}>Your Communities</span>
          </div>
          <button 
            onClick={() => onNavigate('discover')}
            className="text-sm"
            style={{ color: '#7EB8B3' }}
          >
            See all
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {communities.map((community, index) => (
            <motion.div
              key={index}
              className="min-w-[160px] p-4 rounded-2xl cursor-pointer"
              style={{
                backgroundColor: '#F5F0EB',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
              onClick={() => onNavigate('community-detail')}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className="w-full h-20 rounded-xl mb-3"
                style={{ backgroundColor: community.color + '30' }}
              />
              <p className="mb-2" style={{ color: '#4A5568', fontSize: '14px' }}>
                {community.name}
              </p>
              <div className="flex items-center justify-between">
                <span 
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: community.color + '20', color: community.color }}
                >
                  {community.match}% match
                </span>
                <span className="text-xs" style={{ color: '#9CA3AF' }}>
                  {community.members}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mt-6 grid grid-cols-3 gap-3"
      >
        <ActionButton 
          icon={BookOpen} 
          label="Quiz" 
          onClick={() => onNavigate('assessment')}
        />
        <ActionButton 
          icon={Users} 
          label="Mentors" 
          onClick={() => onNavigate('mentors')}
        />
        <ActionButton 
          icon={Compass} 
          label="Explore" 
          onClick={() => onNavigate('discover')}
        />
      </motion.div>

      {/* Daily Reflection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-6 p-6 rounded-3xl"
        style={{
          backgroundColor: '#FFFEF9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
        }}
      >
        <p className="mb-3" style={{ color: '#4A5568' }}>
          Daily Reflection
        </p>
        <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>
          What made you smile today?
        </p>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write your thoughts..."
          className="w-full px-4 py-3 rounded-2xl resize-none focus:outline-none"
          style={{
            backgroundColor: '#F5F0EB',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)',
            color: '#4A5568',
            fontSize: '14px'
          }}
          rows={3}
        />
      </motion.div>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="p-4 rounded-2xl flex flex-col items-center gap-2"
      style={{
        backgroundColor: '#FFFEF9',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: '#7EB8B3' + '20'
        }}
      >
        <Icon size={24} style={{ color: '#7EB8B3' }} />
      </div>
      <span className="text-sm" style={{ color: '#4A5568' }}>{label}</span>
    </motion.button>
  );
}
