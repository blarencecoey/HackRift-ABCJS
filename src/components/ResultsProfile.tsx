import { motion } from 'motion/react';
import { Sparkles, Heart, Lightbulb, Users, Star, TrendingUp } from 'lucide-react';

interface ResultsProfileProps {
  onNavigate: (screen: string) => void;
}

export function ResultsProfile({ onNavigate }: ResultsProfileProps) {
  const strengths = [
    { icon: Heart, label: 'Empathetic', color: '#F2C4B3' },
    { icon: Lightbulb, label: 'Creative', color: '#7EB8B3' },
    { icon: Users, label: 'Collaborative', color: '#7A9A8B' },
    { icon: Star, label: 'Optimistic', color: '#F2C4B3' },
    { icon: TrendingUp, label: 'Ambitious', color: '#7EB8B3' },
  ];

  const traits = [
    { name: 'Extraversion', value: 75, color: '#7EB8B3' },
    { name: 'Openness', value: 85, color: '#F2C4B3' },
    { name: 'Conscientiousness', value: 65, color: '#7A9A8B' },
    { name: 'Agreeableness', value: 90, color: '#7EB8B3' },
  ];

  const compatibleProfiles = [
    { initials: 'JL', match: 92 },
    { initials: 'SK', match: 88 },
    { initials: 'MR', match: 85 },
    { initials: 'AW', match: 83 },
  ];

  return (
    <div className="min-h-screen px-6 pt-12 pb-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div 
          className="w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #7EB8B3 0%, #F2C4B3 100%)',
            boxShadow: '0 8px 32px rgba(126, 184, 179, 0.3)'
          }}
        >
          <Sparkles size={48} color="#FFFEF9" />
        </div>
        <h1 className="mb-2" style={{ color: '#4A5568' }}>
          The Connector
        </h1>
        <p style={{ color: '#9CA3AF', fontSize: '14px' }}>
          ENFP • Enthusiastic • Creative • Sociable
        </p>
      </motion.div>

      {/* Animated Trait Ring */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-8 p-6 rounded-3xl"
        style={{
          backgroundColor: '#FFFEF9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
        }}
      >
        <div className="text-center">
          <div className="relative w-40 h-40 mx-auto mb-4">
            <svg className="transform -rotate-90" width="160" height="160">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#F5F0EB"
                strokeWidth="12"
                fill="none"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#gradient2)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeLinecap="round"
                initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - 0.82) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7EB8B3" />
                  <stop offset="100%" stopColor="#F2C4B3" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span style={{ fontSize: '32px', color: '#4A5568' }}>82%</span>
              <span className="text-sm" style={{ color: '#9CA3AF' }}>Complete</span>
            </div>
          </div>
          <p className="text-sm" style={{ color: '#9CA3AF' }}>
            Your personality profile is shaping up beautifully
          </p>
        </div>
      </motion.div>

      {/* Top 5 Strengths */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mb-8"
      >
        <h3 className="mb-4" style={{ color: '#4A5568' }}>
          Your Top Strengths
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {strengths.map((strength, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-2xl"
              style={{
                backgroundColor: '#FFFEF9',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                style={{
                  backgroundColor: strength.color + '20'
                }}
              >
                <strength.icon size={24} style={{ color: strength.color }} />
              </div>
              <p style={{ color: '#4A5568', fontSize: '14px' }}>
                {strength.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Trait Spectrum */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mb-8 p-6 rounded-3xl"
        style={{
          backgroundColor: '#FFFEF9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
        }}
      >
        <h3 className="mb-4" style={{ color: '#4A5568' }}>
          Trait Spectrum
        </h3>
        <div className="space-y-4">
          {traits.map((trait, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span className="text-sm" style={{ color: '#4A5568' }}>
                  {trait.name}
                </span>
                <span className="text-sm" style={{ color: '#9CA3AF' }}>
                  {trait.value}%
                </span>
              </div>
              <div 
                className="h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: '#F5F0EB' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: trait.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${trait.value}%` }}
                  transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Compatibility */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="mb-8 p-6 rounded-3xl"
        style={{
          backgroundColor: '#FFFEF9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
        }}
      >
        <h3 className="mb-4" style={{ color: '#4A5568' }}>
          Most Compatible With
        </h3>
        <div className="flex gap-3">
          {compatibleProfiles.map((profile, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
                style={{
                  background: 'linear-gradient(135deg, #7EB8B3 0%, #F2C4B3 100%)',
                  color: '#FFFEF9'
                }}
              >
                {profile.initials}
              </div>
              <span 
                className="text-xs px-2 py-1 rounded-full"
                style={{ backgroundColor: '#7EB8B3' + '20', color: '#7EB8B3' }}
              >
                {profile.match}%
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.button
        onClick={() => onNavigate('home')}
        className="w-full py-4 rounded-full"
        style={{
          backgroundColor: '#7EB8B3',
          color: '#FFFEF9',
          boxShadow: '0 8px 24px rgba(126, 184, 179, 0.3)'
        }}
        whileTap={{ scale: 0.98 }}
      >
        Continue to Dashboard
      </motion.button>
    </div>
  );
}
