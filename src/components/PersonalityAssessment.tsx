import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { ALL_QUESTIONS, ANSWER_OPTIONS, calculateOceanScores, calculateRiasecCode } from '../data/assessmentQuestions';

interface PersonalityAssessmentProps {
  onNavigate: (screen: string) => void;
  userId?: number;
  onAssessmentComplete?: () => void;
}

export function PersonalityAssessment({ onNavigate, userId, onAssessmentComplete }: PersonalityAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const questions = ALL_QUESTIONS;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (value: number) => {
    setSelectedAnswer(value);
  };

  const handleNext = async () => {
    if (selectedAnswer !== null) {
      // Save current answer
      const currentQ = questions[currentQuestion];
      const newAnswers = { ...answers, [currentQ.id]: selectedAnswer };
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        // Move to next question
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Assessment complete - calculate scores and save
        await handleAssessmentComplete(newAnswers);
      }
    }
  };

  const handleAssessmentComplete = async (finalAnswers: Record<string, number>) => {
    // Calculate scores
    const oceanScores = calculateOceanScores(finalAnswers);
    const riasecCode = calculateRiasecCode(finalAnswers);

    console.log('Assessment Results:', {
      ocean_scores: oceanScores,
      riasec_code: riasecCode
    });

    // Save to backend if userId is available
    if (userId) {
      try {
        const API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:8001';
        const response = await fetch(`${API_URL}/user/${userId}/assessment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ocean_scores: oceanScores,
            riasec_code: riasecCode
          })
        });

        if (response.ok) {
          console.log('Assessment saved successfully');
          // Trigger data refresh in parent component
          if (onAssessmentComplete) {
            onAssessmentComplete();
          }
        } else {
          console.error('Failed to save assessment');
        }
      } catch (error) {
        console.error('Error saving assessment:', error);
      }
    }

    // Navigate to profile to see results
    onNavigate('profile');
  };

  // Check if current question was already answered (for back navigation)
  const currentQ = questions[currentQuestion];
  const wasAnswered = answers[currentQ.id] !== undefined;
  if (wasAnswered && selectedAnswer === null) {
    setSelectedAnswer(answers[currentQ.id]);
  }

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
        {/* Question Type Badge */}
        <div className="mb-4">
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: currentQ.type === 'OCEAN' ? '#7EB8B320' : '#F2A85C20',
              color: currentQ.type === 'OCEAN' ? '#7EB8B3' : '#F2A85C'
            }}
          >
            {currentQ.type === 'OCEAN' ? 'Personality' : 'Career Interest'}
          </span>
        </div>

        <h2 className="mb-8" style={{ color: '#4A5568', fontSize: '20px', lineHeight: '1.4' }}>
          {currentQ.text}
        </h2>

        <div className="space-y-3">
          {ANSWER_OPTIONS.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => handleAnswerSelect(option.value)}
              className="w-full p-4 rounded-2xl text-left transition-all duration-300"
              style={{
                backgroundColor: selectedAnswer === option.value ? '#7EB8B3' + '15' : '#FFFEF9',
                border: selectedAnswer === option.value ? '2px solid #7EB8B3' : '2px solid transparent',
                boxShadow: selectedAnswer === option.value
                  ? '0 8px 24px rgba(126, 184, 179, 0.2)'
                  : '0 4px 20px rgba(0,0,0,0.04)',
                color: '#4A5568'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{option.label}</span>
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  style={{
                    borderColor: selectedAnswer === option.value ? '#7EB8B3' : '#9CA3AF',
                    backgroundColor: selectedAnswer === option.value ? '#7EB8B3' : 'transparent'
                  }}
                >
                  {selectedAnswer === option.value && (
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FFFEF9' }} />
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.button
        onClick={handleNext}
        disabled={selectedAnswer === null}
        className="w-full mt-8 py-4 rounded-full transition-all duration-300 font-medium"
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
        {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Assessment'}
      </motion.button>
    </div>
  );
}
