import { motion } from 'motion/react';
import { Search, Sparkles, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

interface CommunityDiscoveryProps {
  onNavigate: (screen: string) => void;
}

export function CommunityDiscovery({ onNavigate }: CommunityDiscoveryProps) {
  const [activeFilter, setActiveFilter] = useState('For You');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['For You', 'Nearby', 'New', 'Popular'];

  const communities = [
    {
      name: 'Tech Creatives',
      description: 'For designers, developers & digital creators',
      members: 234,
      match: 92,
      tags: ['Tech', 'Design', 'Creative'],
      color: '#7EB8B3',
      featured: true
    },
    {
      name: 'Mindful Makers',
      description: 'Wellness-focused creators & entrepreneurs',
      members: 156,
      match: 88,
      tags: ['Wellness', 'Mindfulness', 'Community'],
      color: '#F2C4B3',
      featured: false
    },
    {
      name: 'Career Explorers',
      description: 'Navigate your professional journey together',
      members: 189,
      match: 85,
      tags: ['Career', 'Growth', 'Networking'],
      color: '#7A9A8B',
      featured: false
    },
    {
      name: 'Creative Writers',
      description: 'Share stories, poetry & creative writing',
      members: 142,
      match: 81,
      tags: ['Writing', 'Arts', 'Expression'],
      color: '#F2C4B3',
      featured: false
    },
    {
      name: 'Startup Founders',
      description: 'Building the next big thing in SG',
      members: 98,
      match: 79,
      tags: ['Startup', 'Business', 'Innovation'],
      color: '#7EB8B3',
      featured: false
    }
  ];

  const featuredCommunity = communities.find(c => c.featured);

  return (
    <div className="min-h-screen px-6 pt-12 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="mb-2" style={{ color: '#4A5568' }}>
          Discover Communities
        </h1>
        <p style={{ color: '#9CA3AF', fontSize: '14px' }}>
          Find your tribe in Singapore
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-6 mb-4"
      >
        <div 
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{
            backgroundColor: '#FFFEF9',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)'
          }}
        >
          <Search size={20} style={{ color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none"
            style={{ color: '#4A5568' }}
          />
        </div>
      </motion.div>

      {/* Filter Chips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex gap-2 mb-6 overflow-x-auto pb-2"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className="px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300"
            style={{
              backgroundColor: activeFilter === filter ? '#7EB8B3' : '#FFFEF9',
              color: activeFilter === filter ? '#FFFEF9' : '#4A5568',
              boxShadow: activeFilter === filter 
                ? '0 4px 12px rgba(126, 184, 179, 0.3)' 
                : '0 2px 8px rgba(0,0,0,0.04)',
              fontSize: '14px'
            }}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      {/* Featured Community Banner */}
      {featuredCommunity && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-6 rounded-3xl overflow-hidden cursor-pointer"
          onClick={() => onNavigate('community-detail')}
          whileTap={{ scale: 0.98 }}
        >
          <div 
            className="relative h-40 p-6 flex flex-col justify-end"
            style={{
              background: `linear-gradient(135deg, ${featuredCommunity.color} 0%, ${featuredCommunity.color}dd 100%)`,
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
            }}
          >
            <div className="absolute top-4 right-4">
              <div 
                className="px-3 py-1 rounded-full flex items-center gap-1"
                style={{ backgroundColor: 'rgba(255,255,255,0.3)', color: '#FFFEF9' }}
              >
                <Sparkles size={14} />
                <span className="text-xs">Featured</span>
              </div>
            </div>
            <h3 className="mb-1" style={{ color: '#FFFEF9' }}>
              {featuredCommunity.name}
            </h3>
            <p className="text-sm mb-3" style={{ color: '#FFFEF9', opacity: 0.9 }}>
              {featuredCommunity.description}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm" style={{ color: '#FFFEF9' }}>
                {featuredCommunity.members} members
              </span>
              <span 
                className="px-3 py-1 rounded-full text-xs"
                style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: featuredCommunity.color }}
              >
                {featuredCommunity.match}% match
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Community Cards */}
      <div className="space-y-4">
        {communities.filter(c => !c.featured).map((community, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            className="p-5 rounded-3xl cursor-pointer"
            style={{
              backgroundColor: '#FFFEF9',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
            }}
            onClick={() => onNavigate('community-detail')}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-16 h-16 rounded-2xl flex-shrink-0"
                style={{ backgroundColor: community.color + '40' }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 style={{ color: '#4A5568' }}>
                    {community.name}
                  </h3>
                  <span 
                    className="px-2 py-1 rounded-full text-xs whitespace-nowrap"
                    style={{ backgroundColor: community.color + '20', color: community.color }}
                  >
                    {community.match}%
                  </span>
                </div>
                <p className="text-sm mb-3" style={{ color: '#9CA3AF' }}>
                  {community.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {community.tags.slice(0, 2).map((tag, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 rounded-full text-xs"
                        style={{ backgroundColor: '#F5F0EB', color: '#4A5568' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs" style={{ color: '#9CA3AF' }}>
                      {community.members} members
                    </span>
                    <button 
                      className="px-4 py-1 rounded-full"
                      style={{
                        backgroundColor: '#7EB8B3',
                        color: '#FFFEF9',
                        fontSize: '12px'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
