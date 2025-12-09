import { motion } from 'motion/react';
import { Settings, Edit2, Heart, Lightbulb, Users, Star, Sparkles, Award } from 'lucide-react';

interface ProfileProps {
  onNavigate: (screen: string) => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const stats = [
    { label: 'Assessments', value: 3, color: '#7EB8B3' },
    { label: 'Communities', value: 5, color: '#F2C4B3' },
    { label: 'Connections', value: 28, color: '#7A9A8B' }
  ];

  const strengths = [
    { icon: Heart, label: 'Empathetic', color: '#F2C4B3' },
    { icon: Lightbulb, label: 'Creative', color: '#7EB8B3' },
    { icon: Users, label: 'Collaborative', color: '#7A9A8B' },
    { icon: Star, label: 'Optimistic', color: '#F2C4B3' }
  ];

  const interests = [
    'Design Thinking',
    'Mindfulness',
    'Career Growth',
    'Creative Writing',
    'Tech',
    'Community Building'
  ];

  const communities = [
    { name: 'Tech Creatives', members: 234, color: '#7EB8B3' },
    { name: 'Mindful Makers', members: 156, color: '#F2C4B3' },
    { name: 'Career Explorers', members: 189, color: '#7A9A8B' }
  ];

  return (
    <div className="min-h-screen px-6 pt-12 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 style={{ color: '#4A5568' }}>Profile</h1>
        <button 
          className="p-2 rounded-full"
          style={{ backgroundColor: '#FFFEF9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
        >
          <Settings size={20} style={{ color: '#4A5568' }} />
        </button>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 p-6 rounded-3xl text-center"
        style={{
          backgroundColor: '#FFFEF9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
        }}
      >
        <div 
          className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center relative"
          style={{
            background: 'linear-gradient(135deg, #7EB8B3 0%, #F2C4B3 100%)',
            color: '#FFFEF9',
            fontSize: '32px'
          }}
        >
          AT
          <button 
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#7EB8B3', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <Edit2 size={14} color="#FFFEF9" />
          </button>
        </div>
        <h2 className="mb-1" style={{ color: '#4A5568' }}>
          Alex Tan
        </h2>
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
          style={{ backgroundColor: '#7EB8B3' + '15' }}
        >
          <Sparkles size={16} style={{ color: '#7EB8B3' }} />
          <span style={{ color: '#7EB8B3', fontSize: '14px' }}>
            The Connector • ENFP
          </span>
        </div>
        <p className="text-sm" style={{ color: '#9CA3AF' }}>
          Passionate about design, wellness & building meaningful connections
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-6 grid grid-cols-3 gap-3"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl text-center"
            style={{
              backgroundColor: '#FFFEF9',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
            }}
          >
            <p className="mb-1" style={{ color: stat.color, fontSize: '24px' }}>
              {stat.value}
            </p>
            <p className="text-xs" style={{ color: '#9CA3AF' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Strengths Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ color: '#4A5568' }}>My Strengths</h3>
          <button 
            onClick={() => onNavigate('results')}
            className="text-sm"
            style={{ color: '#7EB8B3' }}
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {strengths.map((strength, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl"
              style={{
                backgroundColor: '#FFFEF9',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
              }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: strength.color + '20' }}
              >
                <strength.icon size={24} style={{ color: strength.color }} />
              </div>
              <p style={{ color: '#4A5568', fontSize: '14px' }}>
                {strength.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Interests Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mb-6 p-6 rounded-3xl"
        style={{
          backgroundColor: '#FFFEF9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ color: '#4A5568' }}>Interests</h3>
          <button>
            <Edit2 size={16} style={{ color: '#9CA3AF' }} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <span 
              key={index}
              className="px-3 py-2 rounded-full"
              style={{
                backgroundColor: '#F5F0EB',
                color: '#4A5568',
                fontSize: '14px'
              }}
            >
              {interest}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Communities Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ color: '#4A5568' }}>My Communities</h3>
          <button 
            onClick={() => onNavigate('discover')}
            className="text-sm"
            style={{ color: '#7EB8B3' }}
          >
            See All
          </button>
        </div>
        <div className="space-y-3">
          {communities.map((community, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl flex items-center gap-4 cursor-pointer"
              style={{
                backgroundColor: '#FFFEF9',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
              }}
              onClick={() => onNavigate('community-detail')}
            >
              <div 
                className="w-14 h-14 rounded-xl flex-shrink-0"
                style={{ backgroundColor: community.color + '30' }}
              />
              <div className="flex-1">
                <p className="mb-1" style={{ color: '#4A5568' }}>
                  {community.name}
                </p>
                <p className="text-xs" style={{ color: '#9CA3AF' }}>
                  {community.members} members
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Achievement Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="p-5 rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, #7EB8B3 0%, #F2C4B3 100%)'
        }}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
          >
            <Award size={32} color="#FFFEF9" />
          </div>
          <div className="flex-1">
            <p className="mb-1" style={{ color: '#FFFEF9' }}>
              Community Builder
            </p>
            <p className="text-sm" style={{ color: '#FFFEF9', opacity: 0.9 }}>
              You&apos;ve connected with 5 communities! Keep building your tribe.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
