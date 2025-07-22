import React, { useState } from 'react';
import { CheckCircle, Target, AlertTriangle, TrendingUp, Brain, Heart } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: { value: number; label: string }[];
}

const QuickAssessment: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: 'sleep',
      question: 'How would you rate your sleep quality over the past week?',
      options: [
        { value: 0, label: 'Very poor - I rarely get quality sleep' },
        { value: 1, label: 'Poor - I often have trouble sleeping' },
        { value: 2, label: 'Fair - Some nights are better than others' },
        { value: 3, label: 'Good - I usually sleep well' },
        { value: 4, label: 'Excellent - I consistently get great sleep' }
      ]
    },
    {
      id: 'energy',
      question: 'How has your energy level been recently?',
      options: [
        { value: 0, label: 'Very low - I feel exhausted most of the time' },
        { value: 1, label: 'Low - I often feel tired and drained' },
        { value: 2, label: 'Moderate - Some days are better than others' },
        { value: 3, label: 'High - I usually feel energetic' },
        { value: 4, label: 'Very high - I feel vibrant and energized' }
      ]
    },
    {
      id: 'mood',
      question: 'How would you describe your overall mood this week?',
      options: [
        { value: 0, label: 'Very negative - I feel sad or down most days' },
        { value: 1, label: 'Somewhat negative - I have more bad days than good' },
        { value: 2, label: 'Neutral - My mood is neither particularly good nor bad' },
        { value: 3, label: 'Positive - I feel good most of the time' },
        { value: 4, label: 'Very positive - I feel happy and optimistic' }
      ]
    },
    {
      id: 'stress',
      question: 'How would you rate your current stress level?',
      options: [
        { value: 4, label: 'Very high - I feel overwhelmed and unable to cope' },
        { value: 3, label: 'High - I feel stressed frequently' },
        { value: 2, label: 'Moderate - I have some stress but it\'s manageable' },
        { value: 1, label: 'Low - I feel calm most of the time' },
        { value: 0, label: 'Very low - I feel very relaxed and peaceful' }
      ]
    },
    {
      id: 'concentration',
      question: 'How well have you been able to concentrate and focus?',
      options: [
        { value: 0, label: 'Very poor - I can barely focus on anything' },
        { value: 1, label: 'Poor - I have significant difficulty concentrating' },
        { value: 2, label: 'Fair - I can focus sometimes but it\'s challenging' },
        { value: 3, label: 'Good - I can usually focus when I need to' },
        { value: 4, label: 'Excellent - I have no trouble concentrating' }
      ]
    },
    {
      id: 'social',
      question: 'How satisfied are you with your social connections?',
      options: [
        { value: 0, label: 'Very unsatisfied - I feel isolated and lonely' },
        { value: 1, label: 'Unsatisfied - I wish I had better connections' },
        { value: 2, label: 'Neutral - My social life is okay' },
        { value: 3, label: 'Satisfied - I have good relationships' },
        { value: 4, label: 'Very satisfied - I have strong, supportive relationships' }
      ]
    },
    {
      id: 'coping',
      question: 'How well are you managing daily challenges?',
      options: [
        { value: 0, label: 'Very poorly - I feel unable to handle daily tasks' },
        { value: 1, label: 'Poorly - I struggle with everyday challenges' },
        { value: 2, label: 'Somewhat - I manage but it\'s difficult' },
        { value: 3, label: 'Well - I handle most challenges effectively' },
        { value: 4, label: 'Very well - I feel confident managing daily life' }
      ]
    }
  ];

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const maxScore = questions.length * 4;
    return Math.round((totalScore / maxScore) * 100);
  };

  const getScoreInterpretation = (score: number) => {
    if (score >= 80) {
      return {
        level: 'Excellent',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: CheckCircle,
        description: 'You\'re doing great! Your mental wellness appears to be in excellent shape.',
        recommendations: [
          'Continue your current healthy habits',
          'Share your wellness strategies with others',
          'Consider helping others who might be struggling',
          'Maintain regular check-ins with yourself'
        ]
      };
    } else if (score >= 60) {
      return {
        level: 'Good',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        icon: TrendingUp,
        description: 'You\'re managing well overall, with some areas that could use attention.',
        recommendations: [
          'Focus on improving sleep quality',
          'Incorporate regular exercise into your routine',
          'Practice stress management techniques',
          'Consider mindfulness or meditation practices'
        ]
      };
    } else if (score >= 40) {
      return {
        level: 'Moderate',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        icon: Target,
        description: 'You may be experiencing some challenges that warrant attention.',
        recommendations: [
          'Consider talking to a mental health professional',
          'Prioritize self-care activities',
          'Reach out to trusted friends or family',
          'Establish a consistent daily routine'
        ]
      };
    } else {
      return {
        level: 'Needs Attention',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: AlertTriangle,
        description: 'You may be experiencing significant challenges. Please consider seeking professional support.',
        recommendations: [
          'Speak with a mental health professional as soon as possible',
          'Contact a crisis helpline if you\'re in immediate distress',
          'Reach out to trusted friends, family, or support groups',
          'Focus on basic self-care: sleep, nutrition, and gentle movement'
        ]
      };
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const interpretation = getScoreInterpretation(score);
    const Icon = interpretation.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-full ${interpretation.bgColor}`}>
                  <Icon className={`h-12 w-12 ${interpretation.color}`} />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Results</h1>
              <p className="text-gray-600">Based on your responses, here's your mental wellness overview</p>
            </div>

            <div className={`border-2 ${interpretation.borderColor} ${interpretation.bgColor} rounded-xl p-6 mb-8`}>
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-gray-900 mb-2">{score}%</div>
                <div className={`text-xl font-semibold ${interpretation.color}`}>
                  {interpretation.level}
                </div>
              </div>
              <p className="text-gray-700 text-center mb-6">
                {interpretation.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-blue-600" />
                  Recommendations
                </h3>
                <ul className="space-y-3">
                  {interpretation.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-600" />
                  Support Resources
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">Crisis Support</div>
                    <div className="text-sm text-gray-600">National Crisis Hotline: 988</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">Online Therapy</div>
                    <div className="text-sm text-gray-600">Consider professional online counseling</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">Community Support</div>
                    <div className="text-sm text-gray-600">Join our community support groups</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={resetAssessment}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Take Assessment Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-purple-100 rounded-full">
              <Target className="h-12 w-12 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Quick Mental Health Assessment</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take this brief assessment to get insights into your current mental wellness state.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full mr-4 group-hover:border-blue-500 transition-colors">
                    <div className="w-full h-full rounded-full bg-blue-500 scale-0 group-hover:scale-50 transition-transform"></div>
                  </div>
                  <span className="text-gray-700 group-hover:text-blue-700 transition-colors">
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500 self-center">
              Click an option to continue
            </span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> This assessment is for informational purposes only and is not a substitute for professional mental health diagnosis or treatment. If you're experiencing thoughts of self-harm or severe distress, please contact a mental health professional or crisis hotline immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickAssessment;