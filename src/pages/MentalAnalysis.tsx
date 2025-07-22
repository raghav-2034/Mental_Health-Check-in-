import React, { useState } from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Activity, Heart, Zap } from 'lucide-react';

const MentalAnalysis: React.FC = () => {
  const [analysisData, setAnalysisData] = useState({
    cognitiveLoad: 0,
    emotionalStability: 0,
    stressLevel: 0,
    wellnessScore: 0,
    focusLevel: 0,
    socialConnection: 0,
    sleepQuality: 0
  });

  const [showResults, setShowResults] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const analysisSteps = [
    {
      title: 'Cognitive Assessment',
      description: 'Evaluate your mental clarity and processing',
      questions: [
        {
          question: 'How would you rate your ability to concentrate today?',
          key: 'focusLevel',
          options: [
            { value: 1, label: 'Very poor - I can\'t focus at all' },
            { value: 2, label: 'Poor - I struggle to maintain focus' },
            { value: 3, label: 'Fair - I can focus with effort' },
            { value: 4, label: 'Good - I can focus on most tasks' },
            { value: 5, label: 'Excellent - I feel very focused and clear' }
          ]
        },
        {
          question: 'How overwhelming do your thoughts feel right now?',
          key: 'cognitiveLoad',
          options: [
            { value: 5, label: 'Extremely overwhelming - racing thoughts' },
            { value: 4, label: 'Very overwhelming - hard to manage' },
            { value: 3, label: 'Moderately overwhelming - manageable' },
            { value: 2, label: 'Slightly overwhelming - mostly clear' },
            { value: 1, label: 'Not overwhelming - thoughts are clear' }
          ]
        }
      ]
    },
    {
      title: 'Emotional Wellness',
      description: 'Assess your emotional state and stability',
      questions: [
        {
          question: 'How stable do your emotions feel today?',
          key: 'emotionalStability',
          options: [
            { value: 1, label: 'Very unstable - emotions are all over the place' },
            { value: 2, label: 'Unstable - frequent mood changes' },
            { value: 3, label: 'Somewhat stable - minor fluctuations' },
            { value: 4, label: 'Stable - emotions feel balanced' },
            { value: 5, label: 'Very stable - I feel emotionally grounded' }
          ]
        },
        {
          question: 'How connected do you feel to others?',
          key: 'socialConnection',
          options: [
            { value: 1, label: 'Very disconnected - I feel isolated' },
            { value: 2, label: 'Disconnected - limited social connection' },
            { value: 3, label: 'Somewhat connected - average social interaction' },
            { value: 4, label: 'Connected - good social relationships' },
            { value: 5, label: 'Very connected - strong social support' }
          ]
        }
      ]
    },
    {
      title: 'Physical Wellness',
      description: 'Evaluate physical factors affecting mental health',
      questions: [
        {
          question: 'How would you rate your sleep quality recently?',
          key: 'sleepQuality',
          options: [
            { value: 1, label: 'Very poor - I rarely sleep well' },
            { value: 2, label: 'Poor - I often have trouble sleeping' },
            { value: 3, label: 'Fair - some good nights, some bad' },
            { value: 4, label: 'Good - I usually sleep well' },
            { value: 5, label: 'Excellent - I consistently sleep great' }
          ]
        },
        {
          question: 'What\'s your current stress level?',
          key: 'stressLevel',
          options: [
            { value: 5, label: 'Extremely high - I feel overwhelmed' },
            { value: 4, label: 'High - significant stress' },
            { value: 3, label: 'Moderate - manageable stress' },
            { value: 2, label: 'Low - minimal stress' },
            { value: 1, label: 'Very low - I feel very relaxed' }
          ]
        }
      ]
    }
  ];

  const handleAnswer = (key: string, value: number) => {
    setAnalysisData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < analysisSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateOverallScore();
      setShowResults(true);
    }
  };

  const calculateOverallScore = () => {
    const { cognitiveLoad, emotionalStability, stressLevel, focusLevel, socialConnection, sleepQuality } = analysisData;
    
    // Calculate wellness score (higher is better)
    const positiveFactors = emotionalStability + focusLevel + socialConnection + sleepQuality;
    const negativeFactors = cognitiveLoad + stressLevel; // These are reverse scored
    const maxPositive = 4 * 5; // 4 positive factors, max 5 each
    const maxNegative = 2 * 5; // 2 negative factors, max 5 each
    
    const positiveScore = (positiveFactors / maxPositive) * 50;
    const negativeScore = 50 - ((negativeFactors / maxNegative) * 50);
    
    const wellnessScore = Math.round(positiveScore + negativeScore);
    
    setAnalysisData(prev => ({
      ...prev,
      wellnessScore
    }));
  };

  const getAnalysisResults = () => {
    const { wellnessScore, emotionalStability, focusLevel, stressLevel, sleepQuality, socialConnection, cognitiveLoad } = analysisData;
    
    let overallStatus = '';
    let recommendations = [];
    let concerns = [];
    
    if (wellnessScore >= 80) {
      overallStatus = 'Excellent';
      recommendations = [
        'Continue your current wellness practices',
        'Consider mentoring others on their wellness journey',
        'Maintain regular check-ins with yourself'
      ];
    } else if (wellnessScore >= 60) {
      overallStatus = 'Good';
      recommendations = [
        'Focus on areas that scored lower',
        'Consider adding meditation or mindfulness practices',
        'Prioritize consistent sleep schedule'
      ];
    } else if (wellnessScore >= 40) {
      overallStatus = 'Moderate';
      recommendations = [
        'Consider professional mental health support',
        'Implement stress reduction techniques',
        'Focus on building social connections'
      ];
      concerns = ['Moderate stress levels', 'Some areas need attention'];
    } else {
      overallStatus = 'Needs Attention';
      recommendations = [
        'Strongly consider professional mental health support',
        'Focus on immediate stress relief techniques',
        'Prioritize basic self-care: sleep, nutrition, movement'
      ];
      concerns = ['High stress levels', 'Multiple areas of concern'];
    }
    
    // Specific area analysis
    const areas = [
      { name: 'Emotional Stability', score: emotionalStability, max: 5 },
      { name: 'Focus Level', score: focusLevel, max: 5 },
      { name: 'Social Connection', score: socialConnection, max: 5 },
      { name: 'Sleep Quality', score: sleepQuality, max: 5 },
      { name: 'Cognitive Load', score: 6 - cognitiveLoad, max: 5 }, // Reverse scored
      { name: 'Stress Level', score: 6 - stressLevel, max: 5 } // Reverse scored
    ];
    
    return {
      overallStatus,
      wellnessScore,
      recommendations,
      concerns,
      areas
    };
  };

  const resetAnalysis = () => {
    setCurrentStep(0);
    setShowResults(false);
    setAnalysisData({
      cognitiveLoad: 0,
      emotionalStability: 0,
      stressLevel: 0,
      wellnessScore: 0,
      focusLevel: 0,
      socialConnection: 0,
      sleepQuality: 0
    });
  };

  if (showResults) {
    const results = getAnalysisResults();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-indigo-100 rounded-full">
                  <Brain className="h-12 w-12 text-indigo-600" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mental Health Analysis Results</h1>
              <p className="text-gray-600">Your comprehensive mental wellness assessment</p>
            </div>

            {/* Overall Score */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">{results.wellnessScore}</div>
                  <div className="text-sm text-gray-600">/ 100</div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {results.overallStatus} Mental Wellness
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Based on your responses, here's your comprehensive mental health analysis and personalized recommendations.
              </p>
            </div>

            {/* Detailed Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {results.areas.map((area, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">{area.name}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-indigo-600">{area.score}</span>
                    <span className="text-sm text-gray-500">/ {area.max}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(area.score / area.max) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations and Concerns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Recommendations
                </h3>
                <ul className="space-y-3">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {results.concerns.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                    Areas of Concern
                  </h3>
                  <ul className="space-y-3">
                    {results.concerns.map((concern, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                        <span className="text-gray-700">{concern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={resetAnalysis}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Take Analysis Again
              </button>
              <button
                onClick={() => window.location.href = '/resources'}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                View Resources
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = analysisSteps[currentStep];
  const progress = ((currentStep + 1) / analysisSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-indigo-100 rounded-full">
              <Brain className="h-12 w-12 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mental Health Analysis</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get a comprehensive assessment of your mental wellness across multiple dimensions.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {analysisSteps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Current Step */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600">{currentStepData.description}</p>
          </div>

          <div className="space-y-8">
            {currentStepData.questions.map((question, questionIndex) => (
              <div key={questionIndex}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {question.question}
                </h3>
                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      onClick={() => handleAnswer(question.key, option.value)}
                      className={`w-full text-left p-4 border-2 rounded-lg transition-all duration-200 ${
                        analysisData[question.key as keyof typeof analysisData] === option.value
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 border-2 rounded-full mr-4 transition-colors ${
                          analysisData[question.key as keyof typeof analysisData] === option.value
                            ? 'border-indigo-500 bg-indigo-500'
                            : 'border-gray-300'
                        }`}>
                          {analysisData[question.key as keyof typeof analysisData] === option.value && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <span className="text-gray-700">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <button
              onClick={nextStep}
              disabled={currentStepData.questions.some(q => analysisData[q.key as keyof typeof analysisData] === 0)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {currentStep === analysisSteps.length - 1 ? 'Complete Analysis' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalAnalysis;