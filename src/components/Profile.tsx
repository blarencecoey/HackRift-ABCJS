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
}

export function Profile({
  onNavigate,
  completedActivities,
  addActivity,
  removeActivity,
  getTopSkills
}: ProfileProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Activity[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const oceanTraits = [
    { name: 'Openness', value: 68, color: '#7EB8B3' },
    { name: 'Conscientiousness', value: 56, color: '#7A9A8B' },
    { name: 'Extraversion', value: 72, color: '#7EB8B3' },
    { name: 'Agreeableness', value: 72, color: '#F2C4B3' },
    { name: 'Neuroticism', value: 68, color: '#9CA3AF' }
  ];

  const riasecTraits = [
    { name: 'Realistic', value: 65, color: '#7EB8B3' },
    { name: 'Investigative', value: 65, color: '#5A9FB0' },
    { name: 'Artistic', value: 60, color: '#9B7FB8' },
    { name: 'Social', value: 75, color: '#F2A85C' },
    { name: 'Enterprising', value: 55, color: '#E85C5C' },
    { name: 'Conventional', value: 65, color: '#5C7AE8' }
  ];

  const personalityType = oceanTraits.reduce((max, trait) =>
    trait.value > max.value ? trait : max
  );

  const careerInclination = riasecTraits.reduce((max, trait) =>
    trait.value > max.value ? trait : max
  );

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
            AT
          </div>
          <div className="flex-1">
            <h2 className="mb-1" style={{ color: '#4A5568', fontSize: '20px' }}>
              Alex Tan
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
                  <div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: personalityType.color,
                      width: `${personalityType.value}%`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Career Inclination with Bar */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs" style={{ color: '#F2A85C' }}>🎯 Career Inclination</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-full" style={{ backgroundColor: careerInclination.color, color: '#FFFEF9', minWidth: '110px', textAlign: 'center' }}>
                  <span className="text-xs font-medium">{careerInclination.name}</span>
                </div>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#F5F0EB' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: careerInclination.color,
                      width: `${careerInclination.value}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Take/Retake Assessment Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        onClick={() => onNavigate('assessment')}
        className="w-full mb-6 p-4 rounded-2xl flex items-center justify-center gap-2"
        style={{
          backgroundColor: '#7EB8B3',
          color: '#FFFEF9',
          boxShadow: '0 4px 20px rgba(126, 184, 179, 0.3)'
        }}
      >
        <RefreshCw size={18} />
        <span className="font-medium">Take/Retake Assessment</span>
      </motion.button>

      {/* OCEAN Personality Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-6 p-6 rounded-3xl"
        style={{
          backgroundColor: '#FFFEF9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
        }}
      >
        <h3 className="mb-4" style={{ color: '#4A5568', fontSize: '16px', fontWeight: '600' }}>
          OCEAN Personality Profile
        </h3>
        <div className="space-y-4">
          {oceanTraits.map((trait, index) => (
            <motion.div
              key={trait.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm" style={{ color: '#4A5568' }}>{trait.name}</span>
                <span className="text-sm font-medium" style={{ color: trait.color }}>{trait.value}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#F5F0EB' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${trait.value}%` }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.05 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: trait.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* RIASEC Career Inclinations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mb-6 p-6 rounded-3xl"
        style={{
          backgroundColor: '#FFFEF9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
        }}
      >
        <h3 className="mb-4" style={{ color: '#4A5568', fontSize: '16px', fontWeight: '600' }}>
          RIASEC Career Inclinations
        </h3>
        <div className="space-y-4">
          {riasecTraits.map((trait, index) => (
            <motion.div
              key={trait.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm" style={{ color: '#4A5568' }}>{trait.name}</span>
                <span className="text-sm font-medium" style={{ color: trait.color }}>{trait.value}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#F5F0EB' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${trait.value}%` }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.05 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: trait.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Add Course/Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mb-6 p-6 rounded-3xl"
        style={{
          backgroundColor: '#FFFEF9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
        }}
      >
        <h3 className="mb-4" style={{ color: '#4A5568', fontSize: '16px', fontWeight: '600' }}>
          Add Course/Activity
        </h3>
        <div ref={searchRef} className="relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for courses or activities..."
              className="w-full px-4 py-3 rounded-xl text-sm"
              style={{
                backgroundColor: '#F5F0EB',
                border: 'none',
                outline: 'none',
                color: '#4A5568'
              }}
            />
            <Plus
              size={20}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              style={{ color: '#9CA3AF' }}
            />
          </div>

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {showResults && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-2 rounded-xl overflow-hidden"
                style={{
                  backgroundColor: '#FFFEF9',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                }}
              >
                <div className="max-h-60 overflow-y-auto">
                  {searchResults.map((activity, index) => (
                    <button
                      key={`${activity.name}-${index}`}
                      onClick={() => handleAddActivity(activity)}
                      className="w-full px-4 py-3 text-left hover:bg-opacity-50 transition-colors"
                      style={{
                        backgroundColor: index % 2 === 0 ? '#FFFEF9' : '#F5F0EB',
                        borderBottom: index < searchResults.length - 1 ? '1px solid #F5F0EB' : 'none'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium" style={{ color: '#4A5568' }}>
                            {activity.name}
                          </p>
                          <p className="text-xs" style={{ color: '#9CA3AF' }}>
                            {activity.category}
                          </p>
                        </div>
                        <span
                          className="px-2 py-1 rounded-full text-xs"
                          style={{
                            backgroundColor: activity.type === 'Course' ? '#7EB8B3' + '20' : '#F2A85C' + '20',
                            color: activity.type === 'Course' ? '#7EB8B3' : '#F2A85C'
                          }}
                        >
                          {activity.type}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Completed Activities Section */}
      {completedActivities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mb-6 p-6 rounded-3xl"
          style={{
            backgroundColor: '#FFFEF9',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
          }}
        >
          <h3 className="mb-4" style={{ color: '#4A5568', fontSize: '16px', fontWeight: '600' }}>
            Completed Activities
          </h3>
          <div className="space-y-2">
            {completedActivities.map((userActivity, index) => (
              <motion.div
                key={`${userActivity.activity.name}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-xl"
                style={{ backgroundColor: '#F5F0EB' }}
              >
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: '#4A5568' }}>
                    {userActivity.activity.name}
                  </p>
                  <p className="text-xs" style={{ color: '#9CA3AF' }}>
                    {userActivity.activity.type} • {userActivity.activity.category}
                  </p>
                </div>
                <button
                  onClick={() => removeActivity(userActivity.activity.name)}
                  className="p-2 rounded-full hover:bg-opacity-50 transition-colors"
                  style={{ backgroundColor: '#E85C5C' + '20' }}
                >
                  <X size={16} style={{ color: '#E85C5C' }} />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Top Skills Section */}
      {topSkills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mb-6 p-6 rounded-3xl"
          style={{
            backgroundColor: '#FFFEF9',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
          }}
        >
          <h3 className="mb-4" style={{ color: '#4A5568', fontSize: '16px', fontWeight: '600' }}>
            Your Top Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {topSkills.map((skillCount, index) => (
              <motion.div
                key={skillCount.skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-4 py-2 rounded-full"
                style={{
                  backgroundColor: '#7EB8B3' + '20',
                  border: '1px solid #7EB8B3' + '40'
                }}
              >
                <span className="text-sm font-medium" style={{ color: '#4A5568' }}>
                  {skillCount.skill}
                </span>
                <span className="text-sm ml-2" style={{ color: '#7EB8B3' }}>
                  {skillCount.count}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
