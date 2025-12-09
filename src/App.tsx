import { useState } from 'react';
import { Home, Compass, Users, TrendingUp, User } from 'lucide-react';
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
  const [userName, setUserName] = useState('Alex');

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

  const showBottomNav = !['splash', 'assessment', 'results', 'community-detail'].includes(currentScreen);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F0EB' }}>
      <div className="max-w-md mx-auto relative h-screen flex flex-col">
        <div className="flex-1 overflow-y-auto pb-24">
          {renderScreen()}
        </div>
        
        {showBottomNav && (
          <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-4 pb-4">
            <div 
              className="rounded-3xl px-6 py-3 flex items-center justify-between"
              style={{
                backgroundColor: '#FFFEF9',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)'
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
              <div 
                className="relative -mt-8 cursor-pointer"
                onClick={() => navigateTo('discover')}
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: '#7EB8B3',
                    boxShadow: '0 8px 24px rgba(126, 184, 179, 0.3), inset 0 1px 2px rgba(255,255,255,0.3)'
                  }}
                >
                  <Users size={28} color="#FFFEF9" strokeWidth={2} />
                </div>
              </div>
              <NavItem 
                icon={TrendingUp} 
                label="Path" 
                active={currentScreen === 'mentors'}
                onClick={() => navigateTo('mentors')}
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

function NavItem({ icon: Icon, label, active, onClick }: { 
  icon: any; 
  label: string; 
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center gap-1 transition-all duration-300"
      style={{ 
        color: active ? '#7EB8B3' : '#9CA3AF'
      }}
    >
      <Icon size={24} strokeWidth={2} />
      <span className="text-xs">{label}</span>
    </button>
  );
}
