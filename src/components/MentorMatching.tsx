import { motion } from 'motion/react';
import { ChevronDown, Briefcase, Heart, Star } from 'lucide-react';
import { useState } from 'react';

interface MentorMatchingProps {
  onNavigate: (screen: string) => void;
}

export function MentorMatching({ onNavigate }: MentorMatchingProps) {
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedStyle, setSelectedStyle] = useState('All Styles');

  const mentors = [
    {
      name: 'Dr. Sarah Tan',
      role: 'Senior UX Designer',
      company: 'Tech Corp',
      match: 94,
      expertise: ['Design', 'Leadership', 'Mentorship'],
      experience: '12 years',
      sessions: 156,
      rating: 4.9,
      color: '#7EB8B3'
    },
    {
      name: 'Marcus Lim',
      role: 'Product Manager',
      company: 'StartupCo',
      match: 89,
      expertise: ['Product', 'Strategy', 'Growth'],
      experience: '8 years',
      sessions: 98,
      rating: 4.8,
      color: '#F2C4B3'
    },
    {
      name: 'Priya Sharma',
      role: 'Engineering Lead',
      company: 'DataTech',
      match: 87,
      expertise: ['Engineering', 'Career', 'Tech'],
      experience: '10 years',
      sessions: 124,
      rating: 4.9,
      color: '#7A9A8B'
    },
    {
      name: 'Alex Wong',
      role: 'Creative Director',
      company: 'Design Studio',
      match: 85,
      expertise: ['Design', 'Creative', 'Branding'],
      experience: '15 years',
      sessions: 203,
      rating: 5.0,
      color: '#7EB8B3'
    }
  ];

  return (
    <div className="min-h-screen px-6 pt-12 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="mb-2" style={{ color: '#4A5568' }}>
          Find Your Mentor
        </h1>
        <p style={{ color: '#9CA3AF', fontSize: '14px' }}>
          Connect with experienced professionals
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-6 mb-6 grid grid-cols-2 gap-3"
      >
        <div 
          className="relative px-4 py-3 rounded-2xl cursor-pointer"
          style={{
            backgroundColor: '#FFFEF9',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#4A5568' }}>
              {selectedIndustry}
            </span>
            <ChevronDown size={16} style={{ color: '#9CA3AF' }} />
          </div>
        </div>
        <div 
          className="relative px-4 py-3 rounded-2xl cursor-pointer"
          style={{
            backgroundColor: '#FFFEF9',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#4A5568' }}>
              {selectedStyle}
            </span>
            <ChevronDown size={16} style={{ color: '#9CA3AF' }} />
          </div>
        </div>
      </motion.div>

      {/* Mentor Cards */}
      <div className="space-y-4">
        {mentors.map((mentor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            className="p-5 rounded-3xl"
            style={{
              backgroundColor: '#FFFEF9',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
            }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${mentor.color} 0%, ${mentor.color}cc 100%)`,
                  color: '#FFFEF9',
                  fontSize: '20px'
                }}
              >
                {mentor.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h3 className="mb-1" style={{ color: '#4A5568' }}>
                      {mentor.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase size={14} style={{ color: '#9CA3AF' }} />
                      <p className="text-sm" style={{ color: '#9CA3AF' }}>
                        {mentor.role}
                      </p>
                    </div>
                    <p className="text-xs" style={{ color: '#9CA3AF' }}>
                      {mentor.company}
                    </p>
                  </div>
                  <span 
                    className="px-3 py-1 rounded-full text-xs whitespace-nowrap"
                    style={{ backgroundColor: mentor.color + '20', color: mentor.color }}
                  >
                    {mentor.match}% match
                  </span>
                </div>
              </div>
            </div>

            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {mentor.expertise.map((skill, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 rounded-full text-xs"
                  style={{ backgroundColor: '#F5F0EB', color: '#4A5568' }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-4 pb-4" style={{ borderBottom: '1px solid #F5F0EB' }}>
              <div className="flex items-center gap-1">
                <Star size={14} style={{ color: '#F2C4B3', fill: '#F2C4B3' }} />
                <span className="text-sm" style={{ color: '#4A5568' }}>
                  {mentor.rating}
                </span>
              </div>
              <span className="text-xs" style={{ color: '#9CA3AF' }}>
                {mentor.sessions} sessions
              </span>
              <span className="text-xs" style={{ color: '#9CA3AF' }}>
                {mentor.experience}
              </span>
            </div>

            {/* Action Button */}
            <button 
              className="w-full py-3 rounded-full transition-all duration-300"
              style={{
                backgroundColor: mentor.color,
                color: '#FFFEF9',
                boxShadow: `0 4px 12px ${mentor.color}40`
              }}
            >
              Connect with {mentor.name.split(' ')[0]}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mt-6 p-5 rounded-3xl"
        style={{
          backgroundColor: '#7EB8B3' + '15',
          border: '1px solid #7EB8B3' + '30'
        }}
      >
        <div className="flex items-start gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#7EB8B3' + '30' }}
          >
            <Heart size={20} style={{ color: '#7EB8B3' }} />
          </div>
          <div>
            <p className="mb-1" style={{ color: '#4A5568', fontSize: '14px' }}>
              How mentoring works
            </p>
            <p className="text-xs" style={{ color: '#9CA3AF' }}>
              Connect with mentors for 1-on-1 sessions, get career advice, and grow your professional network. All matches are based on your personality profile.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
