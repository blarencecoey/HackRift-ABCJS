import { motion } from 'motion/react';
import { ChevronLeft, Heart, MessageCircle, Share2, Calendar, Users } from 'lucide-react';
import { useState } from 'react';
import { CommunityData } from './CommunityDiscovery';

interface CommunityDetailProps {
  onNavigate: (screen: string) => void;
  community?: CommunityData | null;
}

export function CommunityDetail({ onNavigate, community }: CommunityDetailProps) {
  const [activeTab, setActiveTab] = useState('Feed');

  const tabs = ['Feed', 'Events', 'Members'];

  // Safety check
  if (!community) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-[#4A5568] bg-[#F5F0EB]">
        <p className="mb-4">No community selected.</p>
        <button
          onClick={() => onNavigate('discover')}
          className="px-6 py-2 rounded-full bg-[#7EB8B3] text-white"
        >
          Back to Discovery
        </button>
      </div>
    );
  }

  // Generate dynamic content based on community tags/name
  const isTech = community.tags.some(t => ['Tech', 'Coding', 'Dev', 'AI', 'Data', 'Upskilling'].includes(t));
  const isWellness = community.tags.some(t => ['Wellness', 'Mindfulness', 'Yoga', 'Health', 'Holistic'].includes(t));

  const getDynamicPosts = () => {
    if (isTech) {
      return [
        {
          author: 'Alex Chen',
          time: '2h ago',
          content: `Just finished the ${community.name} hackathon! The energy was insane. Who else is working on AI projects?`,
          likes: 34,
          comments: 12,
          color: community.color
        },
        {
          author: 'Sarah Jenkins',
          time: '5h ago',
          content: 'Looking for study buddies for the upcoming certification exam. Let me know if interested!',
          likes: 15,
          comments: 6,
          color: '#7A9A8B'
        }
      ];
    } else if (isWellness) {
      return [
        {
          author: 'Mira Ray',
          time: '3h ago',
          content: `The morning session in ${community.name} was exactly what I needed. Feeling so grounded. 🌿`,
          likes: 45,
          comments: 8,
          color: community.color
        },
        {
          author: 'John Doe',
          time: '6h ago',
          content: 'Has anyone tried the new meditation guide? Highly recommend it for stress relief.',
          likes: 22,
          comments: 4,
          color: '#F2C4B3'
        }
      ];
    } else {
      return [
        {
          author: 'Sam Rivera',
          time: '4h ago',
          content: `Really enjoying being part of ${community.name}. The community support here is unmatched!`,
          likes: 28,
          comments: 5,
          color: community.color
        },
        {
          author: 'Casey Li',
          time: '1d ago',
          content: `Can't wait for our next meetup! The last one was so inspiring.`,
          likes: 31,
          comments: 9,
          color: '#E5B9A8'
        }
      ];
    }
  };

  const posts = getDynamicPosts();

  const events = [
    {
      title: `${community.name} Meetup`,
      date: 'Dec 15, 2025',
      time: '7:00 PM',
      attendees: Math.floor(community.members * 0.15)
    },
    {
      title: isTech ? 'Coding Workshop' : (isWellness ? 'Group Meditation' : 'Networking Night'),
      date: 'Dec 20, 2025',
      time: '6:30 PM',
      attendees: Math.floor(community.members * 0.2)
    }
  ];

  const members = [
    { name: 'Sarah C.', role: isTech ? 'Developer' : 'Member', initials: 'SC' },
    { name: 'James L.', role: isTech ? 'Designer' : 'Member', initials: 'JL' },
    { name: 'Maya K.', role: 'Lead', initials: 'MK' },
    { name: 'Alex T.', role: 'Newbie', initials: 'AT' }
  ];

  return (
    <div className="min-h-screen font-sans bg-[#F5F0EB]">
      {/* Cover Image with Gradient */}
      <div
        className="relative h-64"
        style={{
          background: `linear-gradient(135deg, ${community.color} 0%, ${community.color}dd 100%)`
        }}
      >
        <button
          onClick={() => onNavigate('discover')}
          className="absolute top-12 left-6 p-2 rounded-full cursor-pointer hover:bg-white/20 transition-colors"
          style={{
            backgroundColor: 'rgba(255,255,255,0.3)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <ChevronLeft size={24} color="#FFFEF9" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
          <h1 className="mb-2 text-3xl font-bold font-serif" style={{ color: '#FFFEF9' }}>
            {community.name}
          </h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Users size={16} color="#FFFEF9" />
              <span className="text-sm font-medium" style={{ color: '#FFFEF9' }}>{community.members} members</span>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: community.color }}
            >
              {community.match}% match
            </span>
          </div>
          <button
            className="px-8 py-3 rounded-full font-semibold shadow-lg active:scale-95 transition-transform hover:shadow-xl"
            style={{
              backgroundColor: '#FFFEF9',
              color: community.color,
            }}
          >
            Join Community
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="sticky top-0 px-6 pt-4 z-10"
        style={{ backgroundColor: '#F5F0EB' }}
      >
        <div className="flex gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-full transition-all duration-300 font-medium"
              style={{
                backgroundColor: activeTab === tab ? '#FFFEF9' : 'transparent',
                color: activeTab === tab ? '#D4A574' : '#9CA3AF',
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
      <div className="px-6 pb-24">
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
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold"
                    style={{
                      backgroundColor: post.color + '40',
                      color: '#4A5568'
                    }}
                  >
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold" style={{ color: '#4A5568' }}>{post.author}</p>
                    <p className="text-xs" style={{ color: '#9CA3AF' }}>{post.time}</p>
                  </div>
                </div>
                <p className="mb-4 leading-relaxed" style={{ color: '#4A5568', fontSize: '15px' }}>
                  {post.content}
                </p>
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Heart size={20} style={{ color: '#F2C4B3' }} />
                    <span className="text-sm font-medium" style={{ color: '#9CA3AF' }}>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <MessageCircle size={20} style={{ color: '#7EB8B3' }} />
                    <span className="text-sm font-medium" style={{ color: '#9CA3AF' }}>{post.comments}</span>
                  </button>
                  <button className="hover:opacity-80 transition-opacity">
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
                    style={{ backgroundColor: community.color + '20' }}
                  >
                    <Calendar size={28} style={{ color: community.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-bold" style={{ color: '#4A5568' }}>
                      {event.title}
                    </h3>
                    <p className="text-sm mb-3 font-medium" style={{ color: '#9CA3AF' }}>
                      {event.date} • {event.time}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium" style={{ color: '#9CA3AF' }}>
                        {event.attendees} attending
                      </span>
                      <button
                        className="px-5 py-2 rounded-full font-semibold transition-transform active:scale-95"
                        style={{
                          backgroundColor: community.color,
                          color: '#FFFEF9',
                          fontSize: '13px'
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
                className="p-4 rounded-3xl text-center"
                style={{
                  backgroundColor: '#FFFEF9',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg"
                  style={{
                    background: `linear-gradient(135deg, ${community.color} 0%, ${community.color}dd 100%)`,
                    color: '#FFFEF9'
                  }}
                >
                  {member.initials}
                </div>
                <p className="mb-1 font-bold" style={{ color: '#4A5568', fontSize: '15px' }}>
                  {member.name}
                </p>
                <p className="text-xs mb-3 font-medium" style={{ color: '#9CA3AF' }}>
                  {member.role}
                </p>
                <button
                  className="w-full py-2 rounded-full font-semibold transition-colors hover:bg-opacity-30"
                  style={{
                    backgroundColor: community.color + '20',
                    color: community.color,
                    fontSize: '13px'
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
