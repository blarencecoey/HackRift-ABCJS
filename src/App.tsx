import { useState } from 'react';
import { Home, Search, Heart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SplashScreen } from './components/SplashScreen';
import { HomeDashboard } from './components/HomeDashboard';
import { PersonalityAssessment } from './components/PersonalityAssessment';
import { ResultsProfile } from './components/ResultsProfile';
import { CommunityDiscovery } from './components/CommunityDiscovery';
import { CommunityDetail } from './components/CommunityDetail';
import { MentorMatching } from './components/MentorMatching';
import { Profile } from './components/Profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('splash');
  const [userName, setUserName] = useState('Alyssa');

  const navigateTo = (screen: string) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onGetStarted={() => navigateTo('home')} />;
      case 'home':
        return <HomeDashboard userName={userName} onNavigate={navigateTo} />;
      case 'assessment':
        return <PersonalityAssessment onNavigate={navigateTo} />;
      case 'results':
        return <ResultsProfile onNavigate={navigateTo} />;
      case 'discover':
        return <CommunityDiscovery onNavigate={navigateTo} />;
      case 'community-detail':
        return <CommunityDetail onNavigate={navigateTo} />;
      case 'mentors':
        return <MentorMatching onNavigate={navigateTo} />;
      case 'profile':
        return <Profile onNavigate={navigateTo} />;
      default:
        return <HomeDashboard userName={userName} onNavigate={navigateTo} />;
    }
  };

  const showBottomNav = !['splash', 'splash-screen'].includes(currentScreen);

  // Mapping screens to indices
  const getActiveIndex = () => {
    switch (currentScreen) {
      case 'home': return 0;
      case 'discover':
      case 'community-detail': return 1;
      case 'mentors':
      case 'assessment':
      case 'results': return 2;
      case 'profile': return 3;
      default: return 0;
    }
  };

  const activeIndex = getActiveIndex();

  const getNavPath = (index: number) => {
    const width = 375;
    const itemWidth = width / 4;
    const center = itemWidth * index + (itemWidth / 2);

    // Adjusted for 75px height (approx 25% reduction)
    const curveWidth = 100;
    const startX = center - (curveWidth / 2) - 10;
    const endX = center + (curveWidth / 2) + 10;

    // Scaled Y coordinates: 20->15, 90->68, 100->75
    return `
      M 0,15 
      L ${startX},15 
      C ${startX + 30},15 ${center - 30},68 ${center},68 
      C ${center + 30},68 ${endX - 30},15 ${endX},15 
      L ${width},15 
      L ${width},75 
      L 0,75 
      Z
    `;
  };

  const navItems = [
    { icon: Home, label: 'Home', screen: 'home' },
    { icon: Search, label: 'Discover', screen: 'discover' },
    { icon: Heart, label: 'Favorites', screen: 'mentors' },
    { icon: User, label: 'Profile', screen: 'profile' },
  ];

  return (
    <div className="min-h-screen relative font-sans" style={{ backgroundColor: '#F5F0EB' }}>
      <div className="max-w-md mx-auto relative h-screen flex flex-col overflow-hidden shadow-2xl bg-[#F5F0EB]">

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="min-h-full" /* CHANGED from h-full to min-h-full to allow scrolling */
            >
              {renderScreen()}
              {/* Global Spacer for Bottom Navigation */}
              <div className="h-20 w-full flex-shrink-0" />
            </motion.div>
          </AnimatePresence>
        </div>

        {showBottomNav && (
          <div className="absolute bottom-0 left-0 right-0 z-50">
            {/* SVG Background - The "Wave" */}
            <div className="absolute bottom-0 w-full h-[75px] drop-shadow-[0_-5px_10px_rgba(0,0,0,0.03)] pointer-events-none">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 375 75"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-all duration-500 ease-in-out"
              >
                <path
                  d={getNavPath(activeIndex)}
                  fill="#FFFEF9"
                  className="transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                />
              </svg>
            </div>

            {/* Nav Items Container */}
            <div className="relative h-[60px] flex items-end pb-6 z-50">
              {navItems.map((item, index) => {
                const isActive = activeIndex === index;
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex-1 flex flex-col items-center justify-center relative cursor-pointer h-full"
                    onClick={() => navigateTo(item.screen)}
                  >
                    {/* 
                       Active State Floating Circle 
                       - Significantly larger (w-20 h-20)
                       - Pops up higher (-top-10)
                       - Has the Golden Notch
                    */}
                    <div
                      className={`
                        absolute bg-[#FFFEF9] rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.1)]
                        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-10
                        ${isActive ? '-top-10 w-20 h-20 opacity-100 scale-100' : 'top-10 w-4 h-4 opacity-0 scale-0'}
                      `}
                    >
                      {isActive && (
                        <>
                          <div className="relative z-20">
                            <Icon
                              size={32}
                              color="#D69E2E"
                              strokeWidth={1.5}
                            />
                          </div>
                          {/* The Golden Notch / Indicator */}
                          <div
                            className="absolute -bottom-2 w-4 h-4 bg-[#D69E2E] rounded-full z-10"
                            style={{ boxShadow: '0 2px 4px rgba(214,158,46,0.3)' }}
                          />
                        </>
                      )}
                    </div>

                    {/* Inactive Icon */}
                    <div
                      className={`
                        transition-all duration-300 transform z-0 mb-1
                        ${isActive ? 'translate-y-12 opacity-0' : 'translate-y-0 opacity-100'}
                      `}
                    >
                      <Icon
                        size={26}
                        color="#6B7280" // Cool gray for inactive
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
