import { motion } from 'motion/react';
import { ChevronLeft, Heart, MessageCircle, Share2, Calendar, Users } from 'lucide-react';
import { useState } from 'react';

interface CommunityDetailProps {
  onNavigate: (screen: string) => void;
}

export function CommunityDetail({ onNavigate }: CommunityDetailProps) {
  const [activeTab, setActiveTab] = useState('Feed');

  const tabs = ['Feed', 'Events', 'Members'];

  const posts = [
    {
      author: 'Sarah Chen',
      time: '2h ago',
      content: 'Just finished an amazing workshop on design thinking! The collaborative energy was incredible. Anyone else there?',
      likes: 24,
      comments: 8,
      color: '#7EB8B3'
    },
    {
      author: 'James Lee',
      time: '5h ago',
      content: 'Looking for a mentor in UX design. Would love to connect with experienced designers in the community!',
      likes: 18,
      comments: 12,
      color: '#F2C4B3'
    },
    {
      author: 'Maya Kumar',
      time: '1d ago',
      content: 'Excited to share my latest project with you all. Thank you for the constant inspiration and support! 💚',
      likes: 42,
      comments: 15,
      color: '#7A9A8B'
    }
  ];

  const events = [
    {
      title: 'Design Thinking Workshop',
      date: 'Dec 15, 2025',
      time: '7:00 PM',
      attendees: 24
    },
    {
      title: 'Community Meetup',
      date: 'Dec 20, 2025',
      time: '6:30 PM',
      attendees: 38
    }
  ];

  const members = [
    { name: 'Sarah C.', role: 'Designer', initials: 'SC' },
    { name: 'James L.', role: 'Developer', initials: 'JL' },
    { name: 'Maya K.', role: 'Product', initials: 'MK' },
    { name: 'Alex T.', role: 'Writer', initials: 'AT' }
  ];

  return (
    <div className="min-h-screen">
      {/* Cover Image with Gradient */}
      <div 
        className="relative h-64"
        style={{
          background: 'linear-gradient(135deg, #7EB8B3 0%, #F2C4B3 100%)'
        }}
      >
        <button 
          onClick={() => onNavigate('discover')}
          className="absolute top-12 left-6 p-2 rounded-full"
          style={{
            backgroundColor: 'rgba(255,255,255,0.3)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <ChevronLeft size={24} color="#FFFEF9" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
          <h1 className="mb-2" style={{ color: '#FFFEF9' }}>
            Tech Creatives
          </h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Users size={16} color="#FFFEF9" />
              <span className="text-sm" style={{ color: '#FFFEF9' }}>234 members</span>
            </div>
            <span 
              className="px-3 py-1 rounded-full text-xs"
              style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: '#7EB8B3' }}
            >
              92% match
            </span>
          </div>
          <button 
            className="px-8 py-3 rounded-full"
            style={{
              backgroundColor: '#FFFEF9',
              color: '#7EB8B3',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            Join Community
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div 
        className="sticky top-0 px-6 pt-4"
        style={{ backgroundColor: '#F5F0EB' }}
      >
        <div className="flex gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: activeTab === tab ? '#FFFEF9' : 'transparent',
                color: activeTab === tab ? '#4A5568' : '#9CA3AF',
                boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                fontSize: '14px'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-8">
        {activeTab === 'Feed' && (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-5 rounded-3xl"
                style={{
                  backgroundColor: '#FFFEF9',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: post.color + '40',
                      color: '#4A5568'
                    }}
                  >
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p style={{ color: '#4A5568' }}>{post.author}</p>
                    <p className="text-xs" style={{ color: '#9CA3AF' }}>{post.time}</p>
                  </div>
                </div>
                <p className="mb-4" style={{ color: '#4A5568', fontSize: '14px' }}>
                  {post.content}
                </p>
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2">
                    <Heart size={20} style={{ color: '#F2C4B3' }} />
                    <span className="text-sm" style={{ color: '#9CA3AF' }}>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2">
                    <MessageCircle size={20} style={{ color: '#7EB8B3' }} />
                    <span className="text-sm" style={{ color: '#9CA3AF' }}>{post.comments}</span>
                  </button>
                  <button>
                    <Share2 size={20} style={{ color: '#9CA3AF' }} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'Events' && (
          <div className="space-y-4">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-5 rounded-3xl"
                style={{
                  backgroundColor: '#FFFEF9',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#7EB8B3' + '20' }}
                  >
                    <Calendar size={28} style={{ color: '#7EB8B3' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ color: '#4A5568' }}>
                      {event.title}
                    </h3>
                    <p className="text-sm mb-2" style={{ color: '#9CA3AF' }}>
                      {event.date} • {event.time}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: '#9CA3AF' }}>
                        {event.attendees} attending
                      </span>
                      <button 
                        className="px-4 py-2 rounded-full"
                        style={{
                          backgroundColor: '#7EB8B3',
                          color: '#FFFEF9',
                          fontSize: '12px'
                        }}
                      >
                        RSVP
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'Members' && (
          <div className="grid grid-cols-2 gap-4">
            {members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-4 rounded-2xl text-center"
                style={{
                  backgroundColor: '#FFFEF9',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
                }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{
                    background: 'linear-gradient(135deg, #7EB8B3 0%, #F2C4B3 100%)',
                    color: '#FFFEF9'
                  }}
                >
                  {member.initials}
                </div>
                <p className="mb-1" style={{ color: '#4A5568', fontSize: '14px' }}>
                  {member.name}
                </p>
                <p className="text-xs mb-3" style={{ color: '#9CA3AF' }}>
                  {member.role}
                </p>
                <button 
                  className="w-full py-2 rounded-full"
                  style={{
                    backgroundColor: '#7EB8B3' + '20',
                    color: '#7EB8B3',
                    fontSize: '12px'
                  }}
                >
                  Connect
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
