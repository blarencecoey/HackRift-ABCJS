import { motion } from 'motion/react';

interface SplashScreenProps {
  onGetStarted: () => void;
}

export function SplashScreen({ onGetStarted }: SplashScreenProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-8"
      style={{
        background: 'linear-gradient(135deg, #7EB8B3 0%, #F2C4B3 100%)'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <motion.img
          src="src/assets/logo.jpg"
          alt="YUNO Logo"
          className="mb-4 w-64 h-auto object-contain"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.p
          className="mb-12"
          style={{
            fontSize: '18px',
            color: '#FFFEF9',
            opacity: 0.9
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.3 }}
        >
          Know Your Way. Know Your People.
        </motion.p>
      </motion.div>

      <motion.button
        onClick={onGetStarted}
        className="px-12 py-4 rounded-full transition-transform duration-300 active:scale-95"
        style={{
          backgroundColor: '#FFFEF9',
          color: '#7EB8B3',
          fontSize: '16px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Get Started
      </motion.button>
    </div>
  );
}
