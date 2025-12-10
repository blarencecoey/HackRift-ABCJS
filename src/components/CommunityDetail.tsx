import { motion } from 'motion/react';
import { ChevronLeft, Heart, MessageCircle, Share2, Calendar, Users } from 'lucide-react';
import { useState } from 'react';
import { CommunityData } from './CommunityDiscovery';

interface CommunityDetailProps {
  onNavigate: (screen: string) => void;
  community?: CommunityData | null;
}

export function CommunityDetail({ onNavigate, community }: CommunityDetailProps) {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = ['Overview', 'Reviews', 'Classmates'];

  // Safety check
  if (!community) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-[#4A5568] bg-[#F5F0EB]">
        <p className="mb-4">No content selected.</p>
        <button
          onClick={() => onNavigate('discover')}
          className="px-6 py-2 rounded-full bg-[#7EB8B3] text-white"
        >
          Back to Discovery
        </button>
      </div>
    );
  }

  // Dynamic Content Logic
  const isTech = community.tags.some(t => ['Tech', 'Coding', 'Dev', 'AI', 'Data', 'Upskilling'].includes(t));
  const isWellness = community.tags.some(t => ['Wellness', 'Mindfulness', 'Yoga', 'Health', 'Holistic'].includes(t));

  // Reviews Data
  const reviews = [
    {
      author: 'Jamie L.',
      rating: 5,
      date: '2 days ago',
      content: isTech ? 'Incredible depth! The project-based approach really helped me understand the concepts.' : 'A truly transformative experience. I felt so much lighter after just one session.',
      color: '#7EB8B3'
    },
    {
      author: 'Sam T.',
      rating: 4,
      date: '1 week ago',
      content: isTech ? 'Great instructor, though the pace was a bit fast for beginners. fast-paced.' : 'Wonderful atmosphere and community. Highly recommend for anyone looking to de-stress.',
      color: '#F2C4B3'
    },
    {
      author: 'Alex P.',
      rating: 5,
      date: '2 weeks ago',
      content: 'Exceeded my expectations. The networking opportunities were a huge bonus.',
      color: '#7A9A8B'
    }
  ];

  // Classmates/Attendees Data
  const classmates = [
    { name: 'Sarah Chen', role: 'UX Designer', initials: 'SC', status: 'Enrolled' },
    { name: 'James Lee', role: 'Product Manager', initials: 'JL', status: 'Enrolled' },
    { name: 'Maya Kumar', role: 'Developer', initials: 'MK', status: 'Waitlist' },
    { name: 'Alex Thompson', role: 'Student', initials: 'AT', status: 'Enrolled' }
  ];

  return (
    <div className="min-h-screen font-sans bg-[#F5F0EB]">
      {/* Cover Header */}
      <div
        className="relative h-72 rounded-b-3xl overflow-hidden shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${community.color} 0%, ${community.color}dd 100%)`
        }}
      >
        <button
          onClick={() => onNavigate('discover')}
          className="absolute top-12 left-6 p-2 rounded-full hover:bg-white/20 transition-colors z-10"
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <ChevronLeft size={24} color="#FFFEF9" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: 'rgba(255,255,255,0.25)', color: '#FFFEF9' }}
            >
              {community.tags[0]}
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-bold bg-white text-gray-800"
            >
              ⭐ {community.match}% Match
            </span>
          </div>

          <h1 className="mb-3 text-3xl font-bold font-serif leading-tight" style={{ color: '#FFFEF9' }}>
            {community.name}
          </h1>

          <div className="flex items-center gap-6 mb-6 text-white/90 text-sm">
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>{community.members} signed up</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Starting Dec 15</span>
            </div>
          </div>

          <button
            className="w-full py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-transform text-center"
            style={{
              backgroundColor: '#FFFEF9',
              color: community.color,
            }}
          >
            Register Now
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-20 pt-4 pb-2 px-6" style={{ backgroundColor: '#F5F0EB' }}>
        <div className="flex justify-between bg-white/50 p-1 rounded-2xl backdrop-blur-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
              style={{
                backgroundColor: activeTab === tab ? '#FFFFFF' : 'transparent',
                color: activeTab === tab ? '#4A5568' : '#9CA3AF',
                boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 pb-24 pt-2">
        {/* OVERVIEW TAB */}
        {activeTab === 'Overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-3xl shadow-sm">
              <h3 className="text-lg font-bold text-[#4A5568] mb-3">About this Course</h3>
              <p className="text-[#4A5568] leading-relaxed opacity-90">
                {community.description}. This comprehensive program is designed to guide you through the fundamentals and advanced techniques found in {community.tags.join(', ')}.
                Perfect for {isTech ? 'aspiring innovators' : 'those seeking balance'}.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm">
              <h3 className="text-lg font-bold text-[#4A5568] mb-4">What you'll learn</h3>
              <ul className="space-y-3">
                {[
                  isTech ? 'Advanced Problem Solving' : 'Mindfulness Techniques',
                  isTech ? 'Industry Standard Tools' : 'Stress Reduction',
                  isTech ? 'Collaborative Project Management' : 'Emotional Intelligence',
                  'Networking with Peers'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#4A5568]">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: community.color + '20', color: community.color }}>
                      ✓
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'Reviews' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-2 px-2">
              <h3 className="font-bold text-[#4A5568] text-lg">Student Feedback</h3>
              <span className="text-[#7EB8B3] font-bold">4.8/5.0</span>
            </div>
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-3xl shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="font-bold text-[#4A5568]">{review.author}</div>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
                <div className="flex text-yellow-400 text-sm mb-2">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <p className="text-[#4A5568] text-sm leading-relaxed">"{review.content}"</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* CLASSMATES TAB */}
        {activeTab === 'Classmates' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="font-bold text-[#4A5568] text-lg px-2">Who's Signed Up</h3>
            {classmates.map((student, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-3xl shadow-sm flex items-center gap-4"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: community.color }}
                >
                  {student.initials}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#4A5568]">{student.name}</h4>
                  <p className="text-xs text-gray-500">{student.role}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${student.status === 'Enrolled' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {student.status}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
