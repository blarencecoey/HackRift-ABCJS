import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface PersonalityAssessmentProps {
  onNavigate: (screen: string) => void;
}

export function PersonalityAssessment({ onNavigate }: PersonalityAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const questions = [
    {
      text: 'When meeting new people, I usually...',
      answers: [
        'Feel energized and excited',
        'Feel comfortable after warming up',
        'Prefer to observe first',
        'Find it draining'
      ]
    },
    {
      text: 'I make decisions based on...',
      answers: [
        'Logic and facts',
        'Gut feelings',
        'What feels right for everyone',
        'A mix of both'
      ]
    },
    {
      text: 'In group settings, I tend to...',
      answers: [
        'Take the lead naturally',
        'Contribute ideas actively',
        'Support and facilitate',
        'Listen and reflect'
      ]
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (selectedAnswer !== null) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        onNavigate('results');
      }
    }
  };

  return (
    <div className="min-h-screen px-6 pt-12 pb-8">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => onNavigate('home')}
          className="p-2 rounded-full"
          style={{ color: '#4A5568' }}
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-sm" style={{ color: '#9CA3AF' }}>
          {currentQuestion + 1} / {questions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div 
        className="h-2 rounded-full mb-8"
        style={{ backgroundColor: '#F5F0EB' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: '#7EB8B3' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="mb-8" style={{ color: '#4A5568' }}>
          {questions[currentQuestion].text}
        </h2>

        <div className="space-y-4">
          {questions[currentQuestion].answers.map((answer, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedAnswer(index)}
              className="w-full p-5 rounded-2xl text-left transition-all duration-300"
              style={{
                backgroundColor: selectedAnswer === index ? '#7EB8B3' + '15' : '#FFFEF9',
                border: selectedAnswer === index ? '2px solid #7EB8B3' : '2px solid transparent',
                boxShadow: selectedAnswer === index 
                  ? '0 8px 24px rgba(126, 184, 179, 0.2)' 
                  : '0 4px 20px rgba(0,0,0,0.04)',
                color: '#4A5568'
              }}
              whileTap={{ scale: 0.98 }}
            >
              {answer}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.button
        onClick={handleNext}
        disabled={selectedAnswer === null}
        className="w-full mt-8 py-4 rounded-full transition-all duration-300"
        style={{
          backgroundColor: selectedAnswer !== null ? '#7EB8B3' : '#9CA3AF',
          color: '#FFFEF9',
          boxShadow: selectedAnswer !== null 
            ? '0 8px 24px rgba(126, 184, 179, 0.3)' 
            : '0 4px 12px rgba(0,0,0,0.1)',
          opacity: selectedAnswer !== null ? 1 : 0.5
        }}
        whileTap={selectedAnswer !== null ? { scale: 0.98 } : {}}
      >
        {currentQuestion < questions.length - 1 ? 'Next' : 'See Results'}
      </motion.button>
    </div>
  );
}
