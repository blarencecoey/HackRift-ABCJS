import { useState } from 'react';
import { Home, Search, Heart, User, Compass, Users, TrendingUp, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SplashScreen } from './components/SplashScreen';
import { LoginPage } from './components/LoginPage';
import { HomeDashboard } from './components/HomeDashboard';
import { PersonalityAssessment } from './components/PersonalityAssessment';
import { ResultsProfile } from './components/ResultsProfile';
import { CommunityDiscovery } from './components/CommunityDiscovery';
import { CommunityDetail } from './components/CommunityDetail';
import { ReflectionPage } from './components/ReflectionPage';
import { Profile } from './components/Profile';
import { useUserProfile } from './hooks/useUserProfile';

// Defined NavItem component to fix the rendering error
const NavItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 transition-colors duration-200 ${active ? 'text-[#7EB8B3]' : 'text-gray-400'
      }`}
  >
    <Icon size={24} strokeWidth={active ? 2.5 : 2} />
    {/* Optional: Add label if needed for accessibility or design */}
  </button>
);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('splash');
  const [userName, setUserName] = useState('Guest');
  const { completedActivities, addActivity, removeActivity, getTopSkills } = useUserProfile();
  const [userData, setUserData] = useState<{
    userId: number | null;
    username: string;
    oceanScores: Record<string, number>;
    riasecCode: string;
  }>({

    userId: null,
    username: 'Guest',
    oceanScores: {
      Openness: 50,
      Conscientiousness: 50,
      Extraversion: 50,
      Agreeableness: 50,
      Neuroticism: 50
    },
    riasecCode: 'UNK'
  });

  // Fetch user data from backend
  const fetchUserData = async (userId: number) => {
    try {
      const API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:8001';
      const response = await fetch(`${API_URL}/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log("App: Fetched user data:", data); // Added log
        setUserData({
          userId: data.user_id,
          username: data.username,
          oceanScores: data.ocean_scores,
          riasecCode: data.riasec_code
        });
        setUserName(data.username);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const navigateTo = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleLoginSuccess = (username: string, userId: number) => {
    console.log("App: handleLoginSuccess called with", { username, userId });
    setUserName(username);
    setUserData(prev => {
      console.log("App: setting userData with userId", userId);
      return { ...prev, userId };
    });
    fetchUserData(userId);  // Fetch complete user data
    setCurrentScreen('home');
  };

  // Function to refresh user data (used after assessment completion)
  const refreshCurrentUserData = () => {
    if (userData.userId) {
      fetchUserData(userData.userId);
    }
  };

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date()); // Persist calendar selection

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onGetStarted={() => navigateTo('home')} />;
      case 'login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      case 'home':
        return <HomeDashboard
          userName={userName}
          onNavigate={navigateTo}
          topSkills={getTopSkills(5)}
          userId={userData.userId ?? undefined}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />;
      case 'assessment':
        return <PersonalityAssessment
          onNavigate={navigateTo}
          userId={userData.userId || undefined}
          onAssessmentComplete={refreshCurrentUserData}
        />;
      case 'results':
        return <ResultsProfile onNavigate={navigateTo} />;
      case 'discover':
        return <CommunityDiscovery onNavigate={navigateTo} />;
      case 'community-detail':
        return <CommunityDetail onNavigate={navigateTo} />;
      case 'community-detail':
        return <CommunityDetail onNavigate={navigateTo} />;
      case 'reflection':
        return <ReflectionPage onNavigate={navigateTo} />;
      case 'profile':
        return <Profile
          onNavigate={navigateTo}
          completedActivities={completedActivities}
          addActivity={addActivity}
          removeActivity={removeActivity}
          getTopSkills={getTopSkills}
          userName={userData.username}
          oceanScores={userData.oceanScores}
          riasecCode={userData.riasecCode}
        />;
      default:
        return <HomeDashboard
          userName={userName}
          onNavigate={navigateTo}
          topSkills={getTopSkills(5)}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />;
    }
  };

  const showBottomNav = !['splash', 'splash-screen', 'login'].includes(currentScreen);

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
              className="min-h-full"
            >
              {renderScreen()}
              {/* Global Spacer for Bottom Navigation */}
              <div className="h-24 w-full flex-shrink-0" />
            </motion.div>
          </AnimatePresence>
        </div>

        {showBottomNav && (
          <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-4 pb-6 z-[9999]">
            <div
              className="rounded-3xl px-6 py-3 flex items-center justify-between relative"
              style={{
                backgroundColor: '#FFFEF9',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)'
              }}
            >
              <NavItem
                icon={Home}
                label="Home"
                active={currentScreen === 'home'}
                onClick={() => navigateTo('home')}
              />
              <NavItem
                icon={Compass}
                label="Discover"
                active={currentScreen === 'discover'}
                onClick={() => navigateTo('discover')}
              />



              <NavItem
                icon={BookOpen}
                label="Reflection"
                active={currentScreen === 'reflection'}
                onClick={() => navigateTo('reflection')}
              />
              <NavItem
                icon={User}
                label="Profile"
                active={currentScreen === 'profile'}
                onClick={() => navigateTo('profile')}
              />
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
