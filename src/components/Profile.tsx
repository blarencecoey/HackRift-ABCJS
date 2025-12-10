import { motion, AnimatePresence } from 'motion/react';
import { Settings, RefreshCw, Plus, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { searchActivities, Activity } from '../data/activitiesData';
import { UserActivity, SkillCount } from '../hooks/useUserProfile';

interface ProfileProps {
  onNavigate: (screen: string) => void;
  completedActivities: UserActivity[];
  addActivity: (activity: Activity) => boolean;
  removeActivity: (activityId: string) => boolean;
  getTopSkills: (limit?: number) => SkillCount[];
  userName?: string;
  oceanScores?: Record<string, number>;
  riasecCode?: string;
}

export function Profile({
  onNavigate,
  completedActivities,
  addActivity,
  removeActivity,
  getTopSkills,
  userName = 'Guest',
  oceanScores,
  riasecCode = 'UNK'
}: ProfileProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Activity[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Use dynamic OCEAN scores from props or fall back to default
  const oceanTraits = oceanScores ? [
    { name: 'Openness', value: oceanScores.Openness || 50, color: '#7EB8B3' },
    { name: 'Conscientiousness', value: oceanScores.Conscientiousness || 50, color: '#7A9A8B' },
    { name: 'Extraversion', value: oceanScores.Extraversion || 50, color: '#7EB8B3' },
    { name: 'Agreeableness', value: oceanScores.Agreeableness || 50, color: '#F2C4B3' },
    { name: 'Neuroticism', value: oceanScores.Neuroticism || 50, color: '#9CA3AF' }
  ] : [
    { name: 'Openness', value: 50, color: '#7EB8B3' },
    { name: 'Conscientiousness', value: 50, color: '#7A9A8B' },
    { name: 'Extraversion', value: 50, color: '#7EB8B3' },
    { name: 'Agreeableness', value: 50, color: '#F2C4B3' },
    { name: 'Neuroticism', value: 50, color: '#9CA3AF' }
  ];

  // For RIASEC, we don't have individual scores yet, so calculate them from the code
  // If riasecCode is "IAS", give I=80, A=70, S=60, others=50
  const getRiasecValue = (code: string) => {
    if (!riasecCode || riasecCode === 'UNK') return 50;
    const position = riasecCode.indexOf(code);
    if (position === 0) return 80;
    if (position === 1) return 70;
    if (position === 2) return 60;
    return 45;
  };

  const riasecTraits = [
    { name: 'Realistic', value: getRiasecValue('R'), color: '#7EB8B3' },
    { name: 'Investigative', value: getRiasecValue('I'), color: '#5A9FB0' },
    { name: 'Artistic', value: getRiasecValue('A'), color: '#9B7FB8' },
    { name: 'Social', value: getRiasecValue('S'), color: '#F2A85C' },
    { name: 'Enterprising', value: getRiasecValue('E'), color: '#E85C5C' },
    { name: 'Conventional', value: getRiasecValue('C'), color: '#5C7AE8' }
  ];

  const personalityType = oceanTraits.reduce((max, trait) =>
    trait.value > max.value ? trait : max
  );

  const careerInclination = riasecTraits.reduce((max, trait) =>
    trait.value > max.value ? trait : max
  );

  // Generate initials from username
  const getUserInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const topSkills = getTopSkills(7);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length >= 2) {
      const results = searchActivities(query);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleAddActivity = (activity: Activity) => {
    const success = addActivity(activity);
    if (success) {
      setSearchQuery('');
      setSearchResults([]);
      setShowResults(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 p-6 rounded-3xl"
        style={{
          backgroundColor: '#FFFEF9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
        }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #7EB8B3 0%, #F2C4B3 100%)',
              color: '#FFFEF9'
            }}
          >
            {getUserInitials(userName)}
          </div>
          <div className="flex-1">
            <h2 className="mb-1" style={{ color: '#4A5568', fontSize: '20px' }}>
              {userName}
            </h2>
            <p className="text-sm mb-3" style={{ color: '#9CA3AF' }}>
              20 years old
            </p>

            {/* Personality Type with Bar */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs" style={{ color: '#7EB8B3' }}>✨ Personality Type</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-full" style={{ backgroundColor: personalityType.color, color: '#FFFEF9', minWidth: '110px', textAlign: 'center' }}>
                  <span className="text-xs font-medium">{personalityType.name}</span>
                </div>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#F5F0EB' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${personalityType.value}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: personalityType.color }}
                  />
                </div>
                <span className="text-xs font-medium" style={{ color: personalityType.color, minWidth: '35px', textAlign: 'right' }}>
                  {personalityType.value}%
                </span>
              </div>
            </div>

            {/* Career Inclination with Bar */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs" style={{ color: '#F2A85C' }}>🎯 Career Inclination</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-full" style={{ backgroundColor: careerInclination.color, color: '#FFFEF9', minWidth: '110px', textAlign: 'center' }}>
                  <span className="text-xs font-medium">{careerInclination.name}</span>
                </div>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#F5F0EB' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${careerInclination.value}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: careerInclination.color }}
                  />
                </div>
                <span className="text-xs font-medium" style={{ color: careerInclination.color, minWidth: '35px', textAlign: 'right' }}>
                  {careerInclination.value}%
                </span>
              </div>
            </div>

            {/* Take/Retake Assessment Button */}
            <button
              onClick={() => onNavigate('assessment')}
              className="w-full py-2 px-4 rounded-full flex items-center justify-center gap-2"
              style={{
                backgroundColor: '#7EB8B3',
                color: '#FFFEF9',
                boxShadow: '0 2px 8px rgba(126, 184, 179, 0.3)'
              }}
            >
              <RefreshCw size={16} />
              <span className="text-sm font-medium">Take/Retake Assessment</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* OCEAN Personality Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-6 p-6 rounded-3xl"
        style={{
          backgroundColor: '#FFFEF9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
        }}
      >
        <h3 className="mb-4" style={{ color: '#4A5568', fontSize: '16px', fontWeight: '600' }}>
          OCEAN Personality Profile
        </h3>
        <div className="space-y-3">
          {oceanTraits.map((trait, index) => (
            <div key={trait.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm" style={{ color: '#4A5568' }}>{trait.name}</span>
                <span className="text-sm font-medium" style={{ color: trait.color }}>{trait.value}%</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#F5F0EB' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${trait.value}%` }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: trait.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* RIASEC Career Inclinations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-6 p-6 rounded-3xl"
        style={{
          backgroundColor: '#FFFEF9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
        }}
      >
        <h3 className="mb-4" style={{ color: '#4A5568', fontSize: '16px', fontWeight: '600' }}>
          RIASEC Career Inclinations
        </h3>
        <div className="space-y-3">
          {riasecTraits.map((trait, index) => (
            <div key={trait.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm" style={{ color: '#4A5568' }}>{trait.name}</span>
                <span className="text-sm font-medium" style={{ color: trait.color }}>{trait.value}%</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#F5F0EB' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${trait.value}%` }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: trait.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Add Activity Search */}
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
        <h3 className="mb-4" style={{ color: '#4A5568', fontSize: '16px', fontWeight: '600' }}>
          Add Course/Activity
        </h3>
        <div ref={searchRef} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for courses or activities..."
            className="w-full px-4 py-3 rounded-2xl text-sm"
            style={{
              backgroundColor: '#F5F0EB',
              color: '#4A5568',
              border: 'none',
              outline: 'none'
            }}
          />

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {showResults && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-2 rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: '#FFFEF9',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}
              >
                {searchResults.map((activity, index) => (
                  <button
                    key={`${activity.name}-${index}`}
                    onClick={() => handleAddActivity(activity)}
                    className="w-full px-4 py-3 text-left hover:bg-opacity-50 transition-colors"
                    style={{
                      backgroundColor: index % 2 === 0 ? 'transparent' : '#F5F0EB20',
                      borderBottom: index < searchResults.length - 1 ? '1px solid #F5F0EB' : 'none'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium" style={{ color: '#4A5568' }}>
                          {activity.name}
                        </p>
                        <p className="text-xs" style={{ color: '#9CA3AF' }}>
                          {activity.category} • {activity.type}
                        </p>
                      </div>
                      <Plus size={16} style={{ color: '#7EB8B3' }} />
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Completed Activities */}
      {completedActivities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mb-6 p-6 rounded-3xl"
          style={{
            backgroundColor: '#FFFEF9',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
          }}
        >
          <h3 className="mb-4" style={{ color: '#4A5568', fontSize: '16px', fontWeight: '600' }}>
            Completed Activities
          </h3>
          <div className="space-y-2">
            {completedActivities.map((activity) => (
              <div
                key={activity.activityId}
                className="flex items-center justify-between p-3 rounded-2xl"
                style={{ backgroundColor: '#F5F0EB' }}
              >
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: '#4A5568' }}>
                    {activity.name}
                  </p>
                  <p className="text-xs" style={{ color: '#9CA3AF' }}>
                    {activity.category} • {activity.type}
                  </p>
                </div>
                <button
                  onClick={() => removeActivity(activity.activityId)}
                  className="p-2 rounded-full hover:bg-white transition-colors"
                >
                  <X size={16} style={{ color: '#E85C5C' }} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Top Skills */}
      {topSkills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mb-6 p-6 rounded-3xl"
          style={{
            backgroundColor: '#FFFEF9',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'
          }}
        >
          <h3 className="mb-4" style={{ color: '#4A5568', fontSize: '16px', fontWeight: '600' }}>
            Your Top Skills
          </h3>
          <div className="space-y-3">
            {topSkills.map((skillCount, index) => {
              // Calculate max count for relative bar width
              const maxCount = Math.max(...topSkills.map(s => s.count));
              const percentage = (skillCount.count / maxCount) * 100;

              return (
                <motion.div
                  key={skillCount.skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium" style={{ color: '#4A5568' }}>
                      {skillCount.skill}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs" style={{ color: '#9CA3AF' }}>↗</span>
                      <span className="text-xs font-medium" style={{ color: '#4A5568' }}>
                        {skillCount.count}x
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E5E7EB' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.05 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: '#7EB8B3' }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
