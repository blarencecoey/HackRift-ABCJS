userName = { userName }
onNavigate = { navigateTo }
topSkills = { getTopSkills(5) }
selectedDate = { selectedDate }
setSelectedDate = { setSelectedDate }
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
