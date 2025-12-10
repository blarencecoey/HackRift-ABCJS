import { motion } from 'motion/react';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface CommunityDiscoveryProps {
  onNavigate: (screen: string) => void;
}

interface RecommendationItem {
  id: string;
  score: number;
  metadata: {
    title?: string;
    description?: string;
    category?: string;
    target_audience?: string;
    [key: string]: any;
  };
}

interface RecommendationResponse {
  upskilling_recommendations: RecommendationItem[];
  holistic_recommendations: RecommendationItem[];
  query_info: any;
}

export function CommunityDiscovery({ onNavigate }: CommunityDiscoveryProps) {
  const [activeFilter, setActiveFilter] = useState('Grow');
  const [searchQuery, setSearchQuery] = useState('');
  const [userStage] = useState<'Secondary' | 'Post-Secondary'>('Post-Secondary');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const filters = ['Grow', 'Connect'];
  const defaultCommunities = [
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
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const API_URL = import.meta.env.VITE_REC_API_URL || 'http://localhost:8000';
      console.log('Fetching recommendations from:', API_URL); // Debugging
      const response = await fetch(`${API_URL}/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_query: searchQuery,
          user_stage: userStage,
          limit: 5 // Get 5 of each type
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data: RecommendationResponse = await response.json();

      // Combine and map results to UI format
      const combined = [
        ...data.upskilling_recommendations.map(item => mapToCommunity(item, 'Upskilling')),
        ...data.holistic_recommendations.map(item => mapToCommunity(item, 'Holistic'))
      ];

      // Sort by match score
      combined.sort((a, b) => b.match - a.match);

      setRecommendations(combined);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      // Could show error toast here
    } finally {
      setIsLoading(false);
    }
  };

  const mapToCommunity = (item: RecommendationItem, type: string) => {
    const meta = item.metadata;
    // Generate a consistent color based on category/type
    const colors = ['#7EB8B3', '#F2C4B3', '#7A9A8B', '#E5B9A8'];
    const colorIndex = (meta.category?.length || 0) % colors.length;

    return {
      name: meta.title || 'Untitled Activity',
      description: meta.description || 'No description available',
      members: Math.floor(Math.random() * 200) + 50, // Mock member count
      match: Math.round(item.score * 100),
      tags: [type, meta.category || 'General', meta.target_audience || 'All'].filter(Boolean),
      color: colors[colorIndex],
      featured: item.score > 0.8 // Feature high aesthetic matches
    };
  };

  // Use API results if we have searched, otherwise show default
  const displayItems = hasSearched ? recommendations : defaultCommunities;

  // Filter based on Course/Event selection
  const filteredItems = displayItems.filter(item => {
    if (activeFilter === 'Grow') return item.tags.includes('Upskilling');
    if (activeFilter === 'Connect') return item.tags.includes('Holistic');
    return true;
  });

  const featuredCommunity = filteredItems.find(c => c.featured) || filteredItems[0];
  const listItems = filteredItems.filter(c => c !== featuredCommunity);

  return (
    <div className="min-h-screen px-6 pt-6 pb-8">
      {/* Toggle Tabs (Grow / Connect) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-6 mb-3 flex justify-center"
      >
        <div
          className="flex bg-[#E2DED5] p-1.5 rounded-full w-full max-w-[380px] relative shadow-inner"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="flex-1 py-4 rounded-full text-lg font-bold transition-all duration-300 relative z-10"
              style={{
                backgroundColor: activeFilter === filter ? '#FFFFFF' : 'transparent',
                color: activeFilter === filter ? '#D4A574' : '#9CA3AF',
                boxShadow: activeFilter === filter
                  ? '0 2px 4px rgba(0,0,0,0.06)'
                  : 'none'
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-8"
      >
        <div
          className="flex items-center gap-4 px-6 py-4 rounded-2xl"
          style={{
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}
        >
          <Search size={24} style={{ color: '#D4A574' }} />
          <input
            type="text"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 bg-transparent outline-none text-lg"
            style={{ color: '#4A5568' }}
          />
          {isLoading && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Loader2 size={24} color="#7EB8B3" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Featured Community */}
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
            className="relative p-6 flex flex-col gap-4"
            style={{
              background: `linear-gradient(135deg, ${featuredCommunity.color} 0%, ${featuredCommunity.color}dd 100%)`,
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
            }}
          >
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-xl font-bold font-serif leading-tight" style={{ color: '#FFFEF9' }}>
                {featuredCommunity.name}
              </h3>
              <div
                className="flex-shrink-0 px-3 py-1 rounded-full flex items-center gap-1"
                style={{ backgroundColor: 'rgba(255,255,255,0.25)', color: '#FFFEF9' }}
              >
                <Sparkles size={14} />
                <span className="text-xs font-bold">Top Match</span>
              </div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: '#FFFEF9', opacity: 0.95 }}>
              {featuredCommunity.description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: '#FFFEF9', color: featuredCommunity.color }}
              >
                {featuredCommunity.match}% match
              </span>
              <span className="text-xs font-medium opacity-90" style={{ color: '#FFFEF9' }}>
                {featuredCommunity.members} interested
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Results List */}
      <div className="space-y-4">
        {listItems.map((community, index) => (
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
                  <h3 style={{ color: '#4A5568' }} className="truncate">
                    {community.name}
                  </h3>
                  <span
                    className="px-2 py-1 rounded-full text-xs whitespace-nowrap"
                    style={{ backgroundColor: community.color + '20', color: community.color }}
                  >
                    {community.match}%
                  </span>
                </div>
                <p className="text-sm mb-3 line-clamp-2" style={{ color: '#9CA3AF' }}>
                  {community.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 overflow-hidden">
                    {community.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-full text-xs whitespace-nowrap"
                        style={{ backgroundColor: '#F5F0EB', color: '#4A5568' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {hasSearched && listItems.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No matches found. Try a different query!
          </div>
        )}
      </div>
    </div>
  );
}
