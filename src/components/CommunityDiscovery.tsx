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
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [userStage] = useState<'Secondary' | 'Post-Secondary'>('Post-Secondary');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const filters = ['All', 'Courses', 'Events'];
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
      const response = await fetch('http://localhost:8000/recommend', {
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
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Courses') return item.tags.includes('Upskilling');
    if (activeFilter === 'Events') return item.tags.includes('Holistic');
    return true;
  });

  const featuredCommunity = filteredItems.find(c => c.featured) || filteredItems[0];
  const listItems = filteredItems.filter(c => c !== featuredCommunity);

  return (
    <div className="min-h-screen px-6 pt-12 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="mb-2" style={{ color: '#4A5568' }}>
          Discover
        </h1>
        <p style={{ color: '#9CA3AF', fontSize: '14px' }}>
          Find activities matching your personality
        </p>
      </motion.div>

      {/* Search & Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-6 mb-4 space-y-3"
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
            placeholder="Describe yourself (e.g., 'I love coding')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 bg-transparent outline-none"
            style={{ color: '#4A5568' }}
          />
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} color="#7EB8B3" />
          ) : (
            <button
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{ backgroundColor: '#7EB8B3', color: '#FFFEF9' }}
              onClick={handleSearch}
            >
              Search
            </button>
          )}
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
                <span className="text-xs">Top Match</span>
              </div>
            </div>
            <h3 className="mb-1" style={{ color: '#FFFEF9' }}>
              {featuredCommunity.name}
            </h3>
            <p className="text-sm mb-3 line-clamp-2" style={{ color: '#FFFEF9', opacity: 0.9 }}>
              {featuredCommunity.description}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm" style={{ color: '#FFFEF9' }}>
                {featuredCommunity.members} interested
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
