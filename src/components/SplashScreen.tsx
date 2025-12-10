import { motion } from 'motion/react';

interface SplashScreenProps {
  onGetStarted: () => void;
}

export function SplashScreen({ onGetStarted }: SplashScreenProps) {
  // Auto-navigate after delay (optional, but requested design usually implies interaction or timeout? 
  // User didn't specify, but typical splash screens often auto-advance or wait for tap. 
  // The original had a button. The image just shows the logo.
  // I will keep it simple: Just the logo for now, maybe tap anywhere to continue or a subtle button?
  // The image shows CLEAN splash. No specific button visible in the first image, but usually there is one or it times out.
  // I'll make the whole screen clickable to proceed for better UX if there's no visible button.

  return (
    <div
      onClick={onGetStarted}
      className="min-h-screen flex flex-col items-center justify-center cursor-pointer"
      style={{
        backgroundColor: '#F5F0EB'
        // Using the hex directly or var if configured. 
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center flex flex-col items-center"
      >
        <h1
          className="text-6xl mb-2 font-bold"
          style={{
            color: '#333333',
            fontFamily: '"Plus Jakarta Sans", sans-serif', // Ensuring font if loaded, else fallback
            letterSpacing: '-0.02em'
          }}
        >
          YUNO
        </h1>

        <motion.p
          className=""
          style={{
            fontSize: '14px',
            color: '#666666',
            letterSpacing: '0.05em'
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Know Your Way, Know Your People
        </motion.p>
      </motion.div>
    </div>
  );
}
