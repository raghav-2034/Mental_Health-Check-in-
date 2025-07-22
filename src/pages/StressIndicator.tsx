import React, { useState, useEffect } from 'react';
import { Zap, Activity, AlertTriangle, CheckCircle, TrendingDown, RefreshCw } from 'lucide-react';

const StressIndicator: React.FC = () => {
  const [stressLevel, setStressLevel] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isAssessing, setIsAssessing] = useState(false);

  const questions = [
    {
      question: "How tense do you feel right now?",
      options: [
        { text: "Very relaxed", value: 0 },
        { text: "Somewhat relaxed", value: 1 },
        { text: "Neutral", value: 2 },
        { text: "Somewhat tense", value: 3 },
        { text: "Very tense", value: 4 }
      ]
    },
    {
      question: "How overwhelmed do you feel with your current responsibilities?",
      options: [
        { text: "Not at all", value: 0 },
        { text: "A little", value: 1 },
        { text: "Moderately", value: 2 },
        { text: "Quite a bit", value: 3 },
        { text: "Extremely", value: 4 }
      ]
    },
    {
      question: "How difficult is it for you to relax right now?",
      options: [
        { text: "Very easy", value: 0 },
        { text: "Easy", value: 1 },
        { text: "Moderate", value: 2 },
        { text: "Difficult", value: 3 },
        { text: "Very difficult", value: 4 }
      ]
    },
    {
      question: "How often have you felt nervous or anxious today?",
      options: [
        { text: "Never", value: 0 },
        { text: "Rarely", value: 1 },
        { text: "Sometimes", value: 2 },
        { text: "Often", value: 3 },
        { text: "Very often", value: 4 }
      ]
    },
    {
      question: "How well are you managing your current stress?",
      options: [
        { text: "Very well", value: 0 },
        { text: "Well", value: 1 },
        { text: "Moderately", value: 2 },
        { text: "Poorly", value: 3 },
        { text: "Very poorly", value: 4 }
      ]
    }
  ];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate stress level
      const totalScore = newAnswers.reduce((sum, answer) => sum + answer, 0);
      const maxScore = questions.length * 4;
      const calculatedStress = Math.round((totalScore / maxScore) * 100);
      setStressLevel(calculatedStress);
      setShowResults(true);
    }
  };

  const startAssessment = () => {
    setIsAssessing(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
  };

  const resetAssessment = () => {
    setIsAssessing(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
    setStressLevel(0);
  };

  const getStressLevelInfo = (level: number) => {
    if (level < 20) {
      return {
        label: "Very Low",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: CheckCircle,
        description: "You're in a very relaxed state. This is excellent for your mental and physical health.",
        recommendations: [
          "Maintain your current stress management practices",
          "Continue regular relaxation activities",
          "Consider sharing your strategies with others",
          "Stay mindful of potential stressors"
        ]
      };
    } else if (level < 40) {
      return {
        label: "Low",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        icon: TrendingDown,
        description: "You're managing stress well overall. Some minor stress is normal and can even be beneficial.",
        recommendations: [
          "Keep up your current coping strategies",
          "Monitor your stress levels regularly",
          "Practice preventive stress management",
          "Maintain healthy lifestyle habits"
        ]
      };
    } else if (level < 60) {
      return {
        label: "Moderate",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        icon: Activity,
        description: "You're experiencing moderate stress levels. This is manageable but worth addressing.",
        recommendations: [
          "Try deep breathing exercises",
          "Take regular breaks from stressful activities",
          "Consider meditation or mindfulness practices",
          "Evaluate and adjust your daily schedule"
        ]
      };
    } else if (level < 80) {
      return {
        label: "High",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        icon: AlertTriangle,
        description: "You're experiencing high stress levels. It's important to take action to reduce stress.",
        recommendations: [
          "Practice stress reduction techniques immediately",
          "Remove or delegate non-essential tasks",
          "Talk to someone you trust about your stress",
          "Consider professional stress management resources"
        ]
      };
    } else {
      return {
        label: "Very High",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: Zap,
        description: "You're experiencing very high stress levels. Immediate action is recommended.",
        recommendations: [
          "Take immediate steps to reduce stress",
          "Consider speaking with a mental health professional",
          "Remove yourself from stressful situations if possible",
          "Focus on basic self-care: rest, hydration, and nutrition"
        ]
      };
    }
  };

  const stressInfo = getStressLevelInfo(stressLevel);
  const StressIcon = stressInfo.icon;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-full ${stressInfo.bgColor}`}>
                  <StressIcon className={`h-12 w-12 ${stressInfo.color}`} />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Stress Level</h1>
              <p className="text-gray-600">Based on your current responses</p>
            </div>

            <div className={`border-2 ${stressInfo.borderColor} ${stressInfo.bgColor} rounded-xl p-6 mb-8`}>
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-gray-900 mb-2">{stressLevel}%</div>
                <div className={`text-xl font-semibold ${stressInfo.color}`}>
                  {stressInfo.label} Stress
                </div>
              </div>
              <p className="text-gray-700 text-center mb-6">
                {stressInfo.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Immediate Actions
                </h3>
                <ul className="space-y-3">
                  {stressInfo.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Stress Relief
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">4-7-8 Breathing</div>
                    <div className="text-sm text-gray-600">Inhale for 4, hold for 7, exhale for 8</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">Progressive Muscle Relaxation</div>
                    <div className="text-sm text-gray-600">Tense and release muscle groups</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">Mindful Walking</div>
                    <div className="text-sm text-gray-600">Take a 5-minute mindful walk</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={resetAssessment}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Check Again</span>
              </button>
              <button
                onClick={() => window.location.href = '/meditation'}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Meditation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAssessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {questions[currentQuestionIndex].question}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 group"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full mr-4 group-hover:border-orange-500 transition-colors">
                      <div className="w-full h-full rounded-full bg-orange-500 scale-0 group-hover:scale-50 transition-transform"></div>
                    </div>
                    <span className="text-gray-700 group-hover:text-orange-700 transition-colors">
                      {option.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-gray-500 self-center">
                Click an option to continue
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-orange-100 rounded-full">
              <Zap className="h-12 w-12 text-orange-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Stress Indicator</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get real-time insights into your current stress levels and receive personalized recommendations.
          </p>
        </div>

        {/* Start Assessment */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-gradient-to-br from-orange-100 to-red-100 rounded-full">
                <Activity className="h-16 w-16 text-orange-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Check Your Current Stress Level
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              This quick assessment will help you understand your current stress level and provide personalized recommendations for stress management.
            </p>
            
            <button
              onClick={startAssessment}
              className="px-8 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-lg font-semibold"
            >
              Start Stress Assessment
            </button>
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Quick & Easy</h3>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-sm text-gray-600">
              Just 5 questions to get immediate insights into your stress levels.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Personalized</h3>
              <Activity className="h-6 w-6 text-blue-500" />
            </div>
            <p className="text-sm text-gray-600">
              Receive customized recommendations based on your specific stress level.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Actionable</h3>
              <TrendingDown className="h-6 w-6 text-orange-500" />
            </div>
            <p className="text-sm text-gray-600">
              Get immediate stress relief techniques and long-term strategies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressIndicator;